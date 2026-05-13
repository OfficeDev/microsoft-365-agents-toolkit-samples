# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

"""
Proxy Agent for Azure AI Foundry integration with Microsoft 365 Copilot.

This module provides the main ProxyAgent class that handles message routing
between Microsoft 365 Copilot and Azure AI Foundry agents.
"""

import json
import logging
import os
from typing import Any, Dict, Optional

from azure.ai.projects.aio import AIProjectClient
from dotenv import load_dotenv
from microsoft_agents.activity import load_configuration_from_env
from microsoft_agents.authentication.msal import MsalConnectionManager
from microsoft_agents.hosting.core import (
    AgentApplication,
    Authorization,
    MemoryStorage,
    TurnContext,
    TurnState,
)
from microsoft_agents.hosting.core.app.oauth import AuthHandler
from microsoft_agents.hosting.fastapi import CloudAdapter

from userAuthTokenWrapper import UserAuthorizationTokenWrapper

# Configure module logger
logger = logging.getLogger(__name__)

# Constants
DEFAULT_SSO_CONNECTION_NAME = "aifoundryaccess"
SIGN_OUT_COMMAND = "--signout"
CLEAR_CACHE_COMMAND = "--clearcache"

load_dotenv()


class ThreadInfo:
    """Simple container for thread information."""

    def __init__(self, thread_id: str) -> None:
        """
        Initialize ThreadInfo with a thread ID.

        Args:
            thread_id: The thread identifier
        """
        self.id = thread_id


class ProxyAgent(AgentApplication[TurnState]):
    """
    Proxy Agent that integrates Azure AI Foundry with Microsoft 365 Copilot.

    This agent acts as a bridge between Microsoft 365 Copilot and Azure AI Foundry,
    handling authentication, message routing, and conversation state management.

    Attributes:
        _project_endpoint: Azure AI Foundry project endpoint URL
        _agent_id: ID of the Azure AI Foundry agent
        _sso_connection_name: Name of the SSO OAuth connection
        _agent_model_cache: Cache for agent models
        _connection_manager: MSAL connection manager for authentication
        _authorization: Authorization handler for SSO
    """

    def __init__(self) -> None:
        """Initialize the ProxyAgent with required configurations."""
        # Load SDK configuration from environment
        agents_sdk_config = load_configuration_from_env(os.environ)

        # Configuration
        self._project_endpoint = os.environ.get("AZURE_AI_FOUNDRY_PROJECT_ENDPOINT")
        self._agent_id = os.environ.get("AGENT_ID")
        self._sso_connection_name = os.environ.get(
            "AIFOUNDRYCONNECTIONNAME", DEFAULT_SSO_CONNECTION_NAME
        )

        # Validate configuration
        if not self._project_endpoint:
            raise ValueError("AZURE_AI_FOUNDRY_PROJECT_ENDPOINT is not configured.")
        if not self._agent_id:
            raise ValueError("AGENT_ID is not configured.")
        if not self._sso_connection_name:
            raise ValueError("AIFOUNDRYCONNECTIONNAME is not configured.")

        # Agent model cache
        self._agent_model_cache: Dict[str, Any] = {}

        # Create storage and connection manager
        storage = MemoryStorage()
        self._connection_manager = MsalConnectionManager(**agents_sdk_config)

        # Create authorization with SSO handler
        self._authorization = Authorization(
            storage,
            self._connection_manager,
            auth_handlers={
                self._sso_connection_name: AuthHandler(
                    name=self._sso_connection_name,
                    title="Sign in to the Agent",
                    text="Please sign in to continue",
                    abs_oauth_connection_name=self._sso_connection_name,
                )
            },
            **agents_sdk_config,
        )

        # Initialize parent AgentApplication
        super().__init__(
            storage=storage,
            adapter=CloudAdapter(connection_manager=self._connection_manager),
            authorization=self._authorization,
            **agents_sdk_config,
        )

        # Register handlers
        self.message(SIGN_OUT_COMMAND)(self._handle_sign_out)
        self.message(CLEAR_CACHE_COMMAND)(self._handle_clear_cache)
        self.activity("message", auth_handlers=[self._sso_connection_name])(
            self._handle_message
        )
        self.error(self._on_error)

    @property
    def connection_manager(self) -> MsalConnectionManager:
        """
        Get the connection manager for server configuration.

        Returns:
            MsalConnectionManager: The MSAL connection manager instance
        """
        return self._connection_manager

    def _deserialize_thread(self, thread_data: str) -> Optional[Dict[str, str]]:
        """
        Deserialize thread data from JSON string.

        Args:
            thread_data: JSON string containing thread information

        Returns:
            Dictionary with thread data if successful, None otherwise
        """
        try:
            return json.loads(thread_data)
        except json.JSONDecodeError as e:
            logger.debug("Failed to deserialize thread, creating new one. Error: %s", e)
            return None

    def _serialize_thread(self, thread: Any) -> str:
        """
        Serialize thread object to JSON string.

        Args:
            thread: Thread object with an 'id' attribute

        Returns:
            JSON string representation of the thread
        """
        return json.dumps({"id": thread.id})

    async def _create_agents_client(self, context: TurnContext) -> AIProjectClient:
        """
        Create an Azure AI Project client with user authorization.

        Args:
            context: The turn context containing the current activity

        Returns:
            AIProjectClient: Configured Azure AI Project client

        Raises:
            ValueError: If credential creation fails
        """
        logger.info("Starting client creation...")
        logger.info("Project endpoint: %s", self._project_endpoint)
        logger.info("Using SSO authentication for Azure AI Foundry")
        logger.debug("Activity ID: %s", context.activity.id)

        credential = UserAuthorizationTokenWrapper(
            user_identity=self._authorization,
            turn_context=context,
            connection_name=self._sso_connection_name,
        )
        logger.info("UserAuthorizationTokenWrapper created with SSO token")

        logger.info("Creating AIProjectClient...")
        client = AIProjectClient(endpoint=self._project_endpoint, credential=credential)
        logger.info("AIProjectClient created successfully")
        return client

    async def _get_conversation_thread(
        self, client: AIProjectClient, turn_state: TurnState
    ) -> Any:
        """
        Get or create a conversation thread for the current session.

        Args:
            client: The Azure AI Project client
            turn_state: The current turn state containing conversation data

        Returns:
            Thread object with an 'id' attribute
        """
        logger.info("Getting conversation thread...")

        thread_info = None
        if hasattr(turn_state, "conversation"):
            thread_info = turn_state.conversation.get_value("thread_info")

        if not thread_info:
            logger.info("No existing thread found. Creating new thread...")
            new_thread = await client.agents.threads.create()
            logger.info("New thread created: %s", new_thread.id)
            return new_thread

        logger.info("Existing thread info found. Deserializing...")
        deserialized = self._deserialize_thread(thread_info)
        if deserialized:
            logger.info("Thread deserialized: %s", deserialized.get("id"))
            return ThreadInfo(deserialized.get("id"))

        logger.info("Failed to deserialize. Creating new thread...")
        new_thread = await client.agents.threads.create()
        logger.info("New thread created: %s", new_thread.id)
        return new_thread

    async def _handle_sign_out(
        self, context: TurnContext, turn_state: TurnState
    ) -> None:
        """
        Handle user sign out request.

        Args:
            context: The turn context
            turn_state: The current turn state
        """
        try:
            await self._authorization.sign_out(
                context, auth_handler_id=self._sso_connection_name
            )
            logger.info(
                "User signed out successfully from %s", self._sso_connection_name
            )
        except Exception as error:
            logger.error("Error signing out: %s", error)

        await context.send_activity("You have signed out")

    async def _handle_clear_cache(
        self, context: TurnContext, turn_state: TurnState
    ) -> None:
        """
        Handle cache clear request.

        Args:
            context: The turn context
            turn_state: The current turn state
        """
        self._agent_model_cache.clear()
        await context.send_activity("The agent model cache has been cleared.")
        logger.info("The agent model cache has been cleared.")

    async def _handle_message(
        self, context: TurnContext, turn_state: TurnState
    ) -> None:
        """
        Handle incoming messages and forward to Azure AI Foundry agent.

        Args:
            context: The turn context containing the message
            turn_state: The current turn state

        Raises:
            Exception: If message processing fails
        """
        user_message = context.activity.text or ""
        logger.info("===== NEW MESSAGE =====")
        logger.info("User message: %s", user_message)
        logger.debug("Activity ID: %s", context.activity.id)

        # Check if streaming is available (Copilot scope)
        is_streaming = context.streaming_response is not None

        try:
            if is_streaming:
                context.streaming_response.queue_informative_update(
                    "Just a moment please..."
                )
            logger.debug("Queued initial informative update")

            logger.info("Creating AIProjectClient...")
            client = await self._create_agents_client(context)
            logger.info("AIProjectClient created")

            # Get or cache agent model
            agent_model = self._agent_model_cache.get(self._agent_id)
            if not agent_model:
                logger.info("Agent not in cache. Fetching agent ID: %s", self._agent_id)
                if is_streaming:
                    context.streaming_response.queue_informative_update(
                        "Connecting to Azure AI Foundry..."
                    )

                agent_model = await client.agents.get(self._agent_id)
                agent_name = getattr(agent_model, "name", None) or agent_model.id
                logger.info("Agent retrieved: %s", agent_name)

                self._agent_model_cache[self._agent_id] = agent_model
                logger.info("Agent cached")
            else:
                agent_name = getattr(agent_model, "name", None) or getattr(
                    agent_model, "id", self._agent_id
                )
                logger.info("Using cached agent: %s", agent_name)

            # Get conversation thread
            agent_thread = await self._get_conversation_thread(client, turn_state)
            logger.info("Using thread: %s", agent_thread.id)

            if is_streaming:
                context.streaming_response.queue_informative_update(
                    "Sending request to Azure AI Foundry Agent..."
                )

            # Create message in thread
            await client.agents.messages.create(
                thread_id=agent_thread.id, role="user", content=user_message
            )
            logger.info("Message added to thread")

            # Start streaming run
            logger.info("Starting streaming run...")
            full_response_text = ""
            chunk_count = 0

            try:
                async with await client.agents.runs.stream(
                    thread_id=agent_thread.id, agent_id=agent_model.id
                ) as stream:
                    logger.info("Streaming started")

                    async for event in stream:
                        if not isinstance(event, tuple) or len(event) < 2:
                            continue

                        event_type, event_data = event[0], event[1]
                        logger.debug("Stream event: %s", event_type)

                        if event_type == "thread.message.delta":
                            if hasattr(event_data, "delta") and hasattr(
                                event_data.delta, "content"
                            ):
                                for content in event_data.delta.content:
                                    if (
                                        hasattr(content, "type")
                                        and content.type == "text"
                                    ):
                                        if hasattr(content, "text") and hasattr(
                                            content.text, "value"
                                        ):
                                            chunk_text = content.text.value
                                            if chunk_text:
                                                chunk_count += 1
                                                logger.debug(
                                                    'Chunk #%d: "%s"',
                                                    chunk_count,
                                                    chunk_text,
                                                )

                                                if is_streaming:
                                                    context.streaming_response.queue_text_chunk(
                                                        chunk_text
                                                    )
                                                else:
                                                    full_response_text += chunk_text

                        elif event_type == "thread.run.completed":
                            logger.info("Run completed successfully")

                        elif event_type == "thread.run.failed":
                            logger.error("Run failed: %s", event_data)

                logger.info("Streaming complete. Total chunks: %d", chunk_count)

            except Exception as stream_error:
                error_msg = str(stream_error)
                logger.error("Streaming error: %s", error_msg, exc_info=True)
                error_response = f"\n\nAn error occurred during streaming: {error_msg}"
                if is_streaming:
                    context.streaming_response.queue_text_chunk(error_response)
                else:
                    full_response_text += error_response

            finally:
                if is_streaming:
                    await context.streaming_response.end_stream()
                    logger.info("Stream ended")
                else:
                    if full_response_text:
                        await context.send_activity(full_response_text)
                    logger.info("Response sent (non-streaming)")

            # Save thread to conversation state
            if hasattr(turn_state, "conversation"):
                turn_state.conversation.set_value(
                    "thread_info", self._serialize_thread(agent_thread)
                )
                logger.info("Thread saved to conversation state")

        except Exception as error:
            error_msg = str(error)
            logger.error("Error handling message: %s", error_msg, exc_info=True)

            try:
                error_response = (
                    f"An error occurred while processing your request. {error_msg}"
                )
                if is_streaming:
                    context.streaming_response.queue_text_chunk(error_response)
                    await context.streaming_response.end_stream()
                else:
                    await context.send_activity(error_response)
            except Exception as end_error:
                logger.error(
                    "Error ending stream after error: %s", end_error, exc_info=True
                )

    async def _on_error(self, context: TurnContext, error: Exception) -> None:
        """
        Handle unhandled errors in the agent.

        Args:
            context: The turn context
            error: The exception that occurred
        """
        logger.error("Unhandled error: %s", error, exc_info=True)
        await context.send_activity("The agent encountered an error or bug.")


def create_agent_app() -> ProxyAgent:
    """
    Create and configure the ProxyAgent application.

    This factory function creates a new instance of ProxyAgent, avoiding
    module-level instantiation for better testability.

    Returns:
        ProxyAgent: Configured agent application instance
    """
    return ProxyAgent()


# Create the agent instance (for backward compatibility)
# For production use, consider using the create_agent_app() factory function
agent_app = create_agent_app()
CONNECTION_MANAGER = agent_app.connection_manager

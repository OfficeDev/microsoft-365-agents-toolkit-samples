# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

"""
FastAPI server configuration for hosting the Microsoft 365 agent.

This module configures and starts the FastAPI server with JWT authorization
middleware and message handling endpoints.
"""

from os import environ

import uvicorn
from fastapi import FastAPI, Request, Response
from microsoft_agents.hosting.core import AgentApplication, AgentAuthConfiguration
from microsoft_agents.hosting.fastapi import (
    CloudAdapter,
    JwtAuthorizationMiddleware,
    start_agent_process,
)

# Constants
DEFAULT_PORT = 3978
DEFAULT_HOST = "0.0.0.0"


def start_server(
    agent_application: AgentApplication, auth_configuration: AgentAuthConfiguration
) -> None:
    """
    Start the FastAPI server to host the agent.

    Args:
        agent_application: The agent application instance to host
        auth_configuration: Authentication configuration for the agent

    Note:
        This function blocks until the server is stopped. Any exceptions
        from uvicorn.run() will propagate to the caller.
    """
    # Create the FastAPI application
    app = FastAPI()

    # Add JWT authorization middleware
    app.add_middleware(JwtAuthorizationMiddleware)

    # Store configuration in app state
    app.state.agent_configuration = auth_configuration
    app.state.agent_app = agent_application
    app.state.adapter = agent_application.adapter

    @app.post("/api/messages")
    async def messages_endpoint(request: Request) -> Response:
        """
        Handle incoming requests to the /api/messages endpoint.

        Args:
            request: The incoming HTTP request

        Returns:
            Response: The HTTP response from the agent
        """
        agent: AgentApplication = request.app.state.agent_app
        adapter: CloudAdapter = request.app.state.adapter

        return await start_agent_process(
            request,
            agent,
            adapter,
        )

    # Start the server
    port = int(environ.get("PORT", DEFAULT_PORT))
    uvicorn.run(app, host=DEFAULT_HOST, port=port)

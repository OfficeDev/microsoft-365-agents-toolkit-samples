"""
User Authorization Token Wrapper for Microsoft 365 Agents SDK (Python).

This class wraps the UserAuthorization to provide an AsyncTokenCredential
implementation as the AI Foundry agent expects a TokenCredential to be used
for authentication.

Note: To be able to authenticate with the AI Foundry agent, the application
that was used to create the user JWT token must have the 'Azure Machine
Learning Services' => 'user_impersonation' scope configured in the Azure portal.
"""

import logging
from typing import Any

import jwt
from azure.core.credentials import AccessToken
from azure.core.credentials_async import AsyncTokenCredential
from microsoft_agents.hosting.core import Authorization, TurnContext

# Configure module logger
logger = logging.getLogger(__name__)


class UserAuthorizationTokenWrapper(AsyncTokenCredential):
    """
    Implements AsyncTokenCredential for Azure AI Foundry agent authentication.

    This class provides authentication for Azure AI Foundry agents using bot
    user authorization. It wraps the Authorization instance and provides the
    necessary TokenCredential interface.

    Equivalent to the TypeScript class:
    export class UserAuthorizationTokenWrapper implements TokenCredential

    Attributes:
        _user_identity: The Authorization instance from microsoft_agents.hosting.core
        _turn_context: The bot turn context from microsoft_agents.hosting.core
        _connection_name: The name of the OAuth connection
    """

    def __init__(
        self,
        user_identity: Authorization,
        turn_context: TurnContext,
        connection_name: str,
    ) -> None:
        """
        Initialize a new instance of UserAuthorizationTokenWrapper.

        Args:
            user_identity: The Authorization instance
            turn_context: The bot turn context
            connection_name: The name of the OAuth connection (e.g., 'aifoundryaccess')

        Raises:
            ValueError: If any parameter is None
        """
        if not user_identity:
            raise ValueError("user_identity cannot be None")
        if not turn_context:
            raise ValueError("turn_context cannot be None")
        if not connection_name:
            raise ValueError("connection_name cannot be None")

        self._user_identity = user_identity
        self._turn_context = turn_context
        self._connection_name = connection_name

    async def get_token(self, *scopes: str, **kwargs: Any) -> AccessToken:
        """
        Get an access token for the specified scopes.

        This method gets the OAuth token from Authorization which handles the
        SSO flow with the configured OAuth connection (e.g., 'aifoundryaccess').

        Args:
            *scopes: The scopes for which to request the token (not used,
                scope is defined in OAuth connection)
            **kwargs: Optional parameters for token retrieval

        Returns:
            AccessToken with the JWT and expiration timestamp

        Raises:
            ValueError: If token is not available or JWT does not contain
                an 'exp' claim
        """
        # Get the JWT token for SSO using the Authorization service.
        # The OAuth connection handles token exchange with the specified scope
        # (e.g., https://ai.azure.com/user_impersonation for AI Foundry)

        token_response = await self._user_identity.exchange_token(
            self._turn_context, auth_handler_id=self._connection_name
        )

        if not token_response or not token_response.token:
            status = (
                token_response.status if hasattr(token_response, "status") else "N/A"
            )
            logger.error("Token request failed with status: %s", status)
            logger.error("This usually means:")
            logger.error("  1. User is not signed in via SSO")
            logger.error(
                '  2. OAuth connection "%s" is not configured in Azure',
                self._connection_name,
            )
            logger.error("  3. The app doesn't have the required permissions/scopes")
            raise ValueError(
                f"Authentication required for connection: {self._connection_name}"
            )

        jwt_token = token_response.token

        # Decode the JWT token to extract expiration
        try:
            decoded = jwt.decode(jwt_token, options={"verify_signature": False})

            if "exp" not in decoded:
                logger.error("JWT does not contain an exp claim")
                raise ValueError("JWT does not contain an 'exp' claim")

            # Get Unix timestamp (seconds) for AccessToken expires_on parameter
            expiration = decoded["exp"]

            # Return AccessToken with token and expiration Unix timestamp
            return AccessToken(jwt_token, expiration)

        except jwt.DecodeError as e:
            logger.error("Invalid JWT token format: %s", e)
            raise ValueError(f"Invalid JWT token format: {e}") from e

    async def close(self) -> None:
        """Close method for async context manager support."""
        pass

    async def __aenter__(self) -> "UserAuthorizationTokenWrapper":
        """Enter async context manager."""
        return self

    async def __aexit__(self, exc_type: Any, exc_val: Any, exc_tb: Any) -> None:
        """Exit async context manager."""
        await self.close()

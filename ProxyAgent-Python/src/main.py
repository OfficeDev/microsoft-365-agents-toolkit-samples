# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

"""
Main entry point for the Microsoft 365 Proxy Agent application.

This module initializes logging, imports the agent components, and starts
the FastAPI server.
"""

import logging


def setup_logging() -> None:
    """Configure logging for the Microsoft Agents library."""
    ms_agents_logger = logging.getLogger("microsoft_agents")
    ms_agents_logger.addHandler(logging.StreamHandler())
    ms_agents_logger.setLevel(logging.DEBUG)


def main() -> None:
    """
    Initialize and start the agent application.

    This function sets up logging, retrieves the authentication configuration
    from the connection manager and starts the FastAPI server with the agent
    application.
    """
    setup_logging()

    # Import after logging setup to ensure proper logging configuration
    from agent import CONNECTION_MANAGER, agent_app
    from start_server import start_server

    auth_config = CONNECTION_MANAGER.get_default_connection_configuration()

    start_server(
        agent_application=agent_app,
        auth_configuration=auth_config,
    )


if __name__ == "__main__":
    main()

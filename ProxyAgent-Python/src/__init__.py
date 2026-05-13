# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

"""
Microsoft 365 Proxy Agent for Azure AI Foundry integration.

This package provides a proxy agent that connects Microsoft 365 Copilot
with Azure AI Foundry agents.
"""

from .agent import CONNECTION_MANAGER, agent_app, create_agent_app
from .start_server import start_server

# Backward compatibility alias (original code incorrectly used AGENT_APP in __init__.py)
AGENT_APP = agent_app

__all__ = [
    "agent_app",
    "AGENT_APP",  # Backward compatibility
    "CONNECTION_MANAGER",
    "start_server",
    "create_agent_app",
]

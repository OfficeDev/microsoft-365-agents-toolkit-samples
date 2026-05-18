# GitHub Copilot Instructions for Azure AI Foundry Agent for M365 (Python)

## Internal Reference (Microsoft 365 Agents Toolkit Rebranding)
Microsoft 365 Agents Toolkit (formerly Teams Toolkit) has been rebranded. Use this mapping to interpret user input:

| New name                                | Former name            | Note                                                        |
|-----------------------------------------|------------------------|-------------------------------------------------------------|
| Microsoft 365 Agents Toolkit            | Teams Toolkit          | Product name                                                |
| App Manifest                            | Teams app manifest     | Describes app capabilities                                  |
| Microsoft 365 Agents Playground         | Test Tool              | Test Environment                                            |
| `m365agents.yml`                        | `teamsapp.yml`         | Microsoft 365 Agents Toolkit Project configuration files   |
| CLI package `@microsoft/m365agentstoolkit-cli` (command `atk`) | `@microsoft/teamsapp-cli` (command `teamsapp`) | CLI installation/usage |

## Project Overview
This is a proxy solution that connects Azure AI Foundry agents to Microsoft 365 Copilot and Teams using the Microsoft 365 Agents Toolkit and Python.

## Technology Stack
- **Python 3.12** - Bot application runtime
- **aiohttp** - Async HTTP server framework
- **python-dotenv** - Environment variable management
- **microsoft-agents-hosting-aiohttp** - Microsoft 365 Agents SDK for aiohttp
- **microsoft-agents-hosting-core** - Core agent hosting functionality
- **microsoft-agents-authentication-msal** - MSAL-based authentication
- **microsoft-agents-activity** - Bot Framework activity types and configuration
- **azure-ai-projects** - Azure AI Foundry Agent SDK
- **azure-identity** - Azure authentication (DefaultAzureCredential, TokenCredential)
- **Microsoft 365 Agents Toolkit** - Formerly Teams Toolkit
- **Bicep** - Infrastructure as Code
- **Managed Identity** - For production authentication (no secrets)

## Architecture Patterns
- Use the proxy pattern to route messages between M365 Copilot and Azure AI Foundry
- Bot Service acts as the messaging endpoint
- Managed Identity (UserAssignedMSI) for authentication in production
- SSO with OAuth connections:
  - OAuth connection for Azure AI Foundry agent access (with user token)
  - `SsoConnection` - General SSO connection (configurable via OAUTHCONNECTIONNAME)
- Linux App Service with Python 3.12 runtime
- Async/await patterns throughout with asyncio

## Coding Standards
- Use Python 3.12 with type hints
- Follow PEP 8 style guidelines
- Use async/await patterns consistently with asyncio
- Implement proper error handling and logging
- Use environment variables for configuration (os.environ)
- Use f-strings for string formatting
- Prefer dataclasses or TypedDict for structured data

## Key Components
- `src/main.py` - Application entry point:
  - Imports agent application and connection manager
  - Calls `start_server()` with agent configuration
  - Includes sys.path fixes for deployment compatibility
- `src/agent.py` - Main agent integration logic:
  - AgentApplication setup with SSO authorization
  - Azure AI Foundry AgentsClient integration
  - Message handling and streaming responses
  - Thread management and caching
  - User token authentication wrapper (TokenCredential implementations)
- `src/start_server.py` - aiohttp server configuration and startup
- `src/requirements.txt` - Python dependencies (pip)
- `infra/modules/appservice.bicep` - App Service infrastructure (Linux with Python 3.12)
- `infra/modules/bot-oauth-connection.bicep` - OAuth connection configuration
- `m365agents.yml` - Production orchestration
- `m365agents.local.yml` - Local development orchestration

## Common Patterns
- SSO authentication uses OAuth connections with federated credentials
- Bot responds via `context.send_activity()`
- Environment-specific configuration via environment variables with python-dotenv
- Source code deployment with Azure Oryx build (SCM_DO_BUILD_DURING_DEPLOYMENT=true)
- Async context managers for resource management

## Security Best Practices
- Never commit secrets or `.env` files
- Use Managed Identity in production (no secrets)
- Use OAuth connections for SSO (no client secrets)
- Keep `env/.env.dev` and `env/.env.local` in `.gitignore`
- Use Azure Key Vault for sensitive configuration in production

## Naming Conventions
- Bicep modules: lowercase with hyphens (e.g., `app-registration.bicep`)
- Python files: snake_case (e.g., `main.py`, `start_server.py`)
- Python functions/variables: snake_case
- Python classes: PascalCase
- Environment variables: UPPER_SNAKE_CASE or PascalCase (Azure standard)
- Resource names: Use consistent naming pattern with suffix

## Critical SDK Requirements

- **Python SDK (microsoft-agents-*) uses specific environment variable conventions:**
  - Configuration loaded via `load_configuration_from_env(os.environ)`
  - Uses both lowercase and PascalCase variables depending on context
- **Azure Bot Service uses PascalCase variables:**
  - `MicrosoftAppId`, `MicrosoftAppType`, `MicrosoftAppTenantId`, `MicrosoftAppPassword`
- **Azure Identity variables:**
  - `AZURE_CLIENT_ID` - For Managed Identity
  - `AZURE_TENANT_ID` - For tenant-specific auth

- **Solution:** Bicep sets both naming conventions, code has fallback mapping via python-dotenv

## Python-Specific Considerations

### Virtual Environment
- Development: Create with `python -m venv .venv`
- Activate: `.venv\Scripts\Activate.ps1` (Windows) or `source .venv/bin/activate` (Linux/Mac)
- Dependencies: Install with `pip install -r src/requirements.txt`

### Deployment
- Azure Oryx automatically detects Python and creates virtual environment
- Oryx installs dependencies from `requirements.txt` during build
- Start command: `python src/main.py`

### Async/Await Patterns
```python
# Correct pattern for async functions
async def on_message_activity(turn_context: TurnContext):
    # Use await for async operations
    token = await turn_context.adapter.get_user_token(...)
    response = await agent_client.process_message(...)
    await turn_context.send_activity(...)
```

### Token Credential Wrapper
- Implement both `TokenCredential` (sync) and `AsyncTokenCredential` (async)
- Use pre-fetched SSO token for Azure AI Foundry access
- Handle token expiration gracefully

### Error Handling
```python
try:
    # Operation
    result = await some_async_operation()
except Exception as error:
    print(f"[Error] {error}")
    traceback.print_exc()
```

## Deployment
- Local: Press F5 in VS Code (automatic provisioning)
  - Python virtual environment created automatically
  - Dependencies installed automatically
  - Debugger attached with debugpy
- Azure: Use `atk provision` and `atk deploy` commands
  - Oryx build creates production virtual environment
  - All dependencies installed during deployment
- Two deployment modes: Local (dev tunnel) and Production (Azure App Service)

## Testing
- Local debugging via F5 in VS Code with Python debugger
- Automatic sideloading in Teams/M365 Copilot
- Test SSO flow with federated credentials
- Set breakpoints in Python code for step-through debugging
- Use Debug Console for runtime evaluation

## Common Python-Specific Issues

### Import Errors
- Ensure virtual environment is activated
- Verify all packages in `requirements.txt` are installed
- Check Python path with `sys.path`

### Async/Await Issues
- All agent handlers must be async functions
- Use `await` for all async SDK calls
- Don't mix sync and async code improperly

### Type Hints
```python
from typing import Optional, Dict, List
from microsoft_agents.hosting.core import TurnContext

async def handler(turn_context: TurnContext) -> None:
    # Implementation
    pass
```

## Package Management
- Add new dependencies to `src/requirements.txt`
- Pin versions for reproducibility: `package==version`
- Keep packages up to date for security patches
- Test locally before deploying to Azure

## Logging
```python
import logging

# Enable Microsoft Agents SDK logging
ms_agents_logger = logging.getLogger("microsoft_agents")
ms_agents_logger.addHandler(logging.StreamHandler())
ms_agents_logger.setLevel(logging.DEBUG)

# Application logging
logger = logging.getLogger(__name__)
logger.info("Bot started successfully")
```

## Environment Variables
```python
import os
from dotenv import load_dotenv

load_dotenv()  # Loads .env.local or .env.dev

# Access variables
endpoint = os.environ.get("AZURE_AI_FOUNDRY_PROJECT_ENDPOINT")
agent_id = os.environ.get("AGENT_ID")
connection_name = os.environ.get("OAUTHCONNECTIONNAME", "SsoConnection")
```

## Python Virtual Environment Best Practices
- Always use virtual environments for isolation
- Include `.venv/` in `.gitignore`
- Document required Python version (3.12)
- Use `requirements.txt` for dependency management
- Test with the same Python version as production (3.12)

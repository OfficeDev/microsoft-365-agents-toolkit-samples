# Azure Agent for Microsoft 365 (Python)

An intelligent agent that helps with Azure operations and tasks, built with Microsoft 365 Agents Toolkit and Python.

## Quick Start

### Local Development (Debugging)

**One-time setup (before first F5):**

1. Create and activate Python virtual environment: `python -m venv .venv`
2. Activate: `.venv\Scripts\Activate.ps1` (Windows) or `source .venv/bin/activate` (Linux/Mac)
3. Install dependencies: `pip install -r src/requirements.txt`

**Then for every debug session:**

1. Press **F5** in VS Code to start debugging
2. Agent is **automatically sideloaded in Teams/M365 Copilot**
3. Test directly in Teams or Copilot with full debugging support

**Full Setup Guide:** See [LOCAL_DEPLOYMENT.md](LOCAL_DEPLOYMENT.md)

### Azure Production Deployment

1. Configure environment variables in `env/.env.dev`
2. Run `atk provision --env dev` to create Azure resources
3. Run `atk deploy --env dev` to deploy your bot
4. Install in Microsoft Teams

**Full Deployment Guide:** See [AZURE_DEPLOYMENT.md](AZURE_DEPLOYMENT.md)

---

## Documentation

| Guide | Purpose |
|-------|---------|
| **[LOCAL_DEPLOYMENT.md](LOCAL_DEPLOYMENT.md)** | Complete guide for local development and debugging |
| **[AZURE_DEPLOYMENT.md](AZURE_DEPLOYMENT.md)** | Complete guide for Azure production/dev deployment |
| **[infra/modules/GUID_ENCODER_GUIDE.md](infra/modules/GUID_ENCODER_GUIDE.md)** | Technical reference for GUID encoding in Bicep |
| **[infra/modules/BOT_OAUTH_CONNECTION.md](infra/modules/BOT_OAUTH_CONNECTION.md)** | Technical reference for OAuth connection setup |

---

## Architecture

This solution deploys a complete M365 Agent infrastructure:

- **Local Development**: Bot runs on your machine, uses devtunnel for Teams connectivity
- **Azure Production**: Fully deployed to Azure with Managed Identity, App Service, and Bot Service

### Azure Resources (Production)

- User Assigned Managed Identity (bot identity)
- Azure App Service (hosts Python bot on Linux)
- Azure Bot Service (Teams integration)
- Entra ID App Registration (SSO for Azure AI Foundry access)
- OAuth Connection (token exchange for user authentication)

### Azure Resources (Local Development)

- App Registration (bot identity with client secret)
- Azure Bot Service (Teams integration with dynamic endpoint)
- SSO App Registration (federated credentials)
- OAuth Connection

---

## Project Structure

```text
AzureAgentToM365ATK/
├── src/                     # Python source code
│   ├── main.py             # Application entry point (starts aiohttp server)
│   ├── agent.py            # Agent logic & Azure AI Foundry integration
│   ├── start_server.py     # Server configuration
│   └── requirements.txt    # Python dependencies
├── appPackage/              # Teams app package
│   ├── manifest.json        # App manifest template
│   └── build/               # Generated manifests (.dev, .local)
├── env/                     # Environment configuration
│   ├── .env.dev            # Azure production environment
│   └── .env.local          # Local development environment
├── infra/                   # Infrastructure as Code (Bicep)
│   ├── azure.bicep         # Production deployment template
│   ├── azure-local.bicep   # Local development template
│   └── modules/            # Reusable Bicep modules
│       ├── bot-oauth-connection.bicep
│       ├── guid-encoder.bicep
│       ├── BOT_OAUTH_CONNECTION.md
│       └── GUID_ENCODER_GUIDE.md
├── scripts/                 # Utility scripts
│   ├── devtunnel.ps1       # Dev tunnel management (PowerShell)
│   ├── devtunnel.sh        # Dev tunnel management (Bash)
│   ├── env.js              # Environment file generator
│   └── guid-encoder.js     # GUID encoding utility
├── m365agents.yml          # Toolkit orchestration (production)
├── m365agents.local.yml    # Toolkit orchestration (local)
├── AZURE_DEPLOYMENT.md     # Production deployment guide
└── LOCAL_DEPLOYMENT.md     # Local development guide
```

---

## Features

✅ **Single Sign-On (SSO)** - Seamless user authentication with federated credentials  
✅ **Managed Identity** - No passwords or secrets in production  
✅ **Infrastructure as Code** - Repeatable deployments with Bicep  
✅ **Local Debugging** - Full debugging support with breakpoints  
✅ **Multi-environment** - Separate configurations for local, dev, staging, production  
✅ **Teams Integration** - Native Microsoft Teams bot capabilities  

---

## Python Dependencies

The bot uses the following key Python packages:

- **microsoft-agents-hosting-aiohttp** - aiohttp web server integration
- **microsoft-agents-hosting-core** - Core agent hosting functionality
- **microsoft-agents-authentication-msal** - MSAL-based authentication
- **microsoft-agents-activity** - Activity handling and configuration
- **azure-ai-projects** - Azure AI Foundry integration
- **azure-identity** - Azure authentication
- **python-dotenv** - Environment variable management
- **aiohttp** - Async HTTP server

See `src/requirements.txt` for the complete list.

---

## Run the app on other platforms

The Teams app can run in other platforms like Outlook and Microsoft 365 app. See https://aka.ms/vs-ttk-debug-multi-profiles for more details.

---

## Get more info

New to Teams app development or Microsoft 365 Agents Toolkit? Explore Teams app manifests, cloud deployment, and much more in the https://aka.ms/teams-toolkit-vs-docs.

---

## Support

**Report an issue:**

- GitHub: [Teams Toolkit Issues](https://github.com/OfficeDev/TeamsFx/issues)
- VS Code: Help → Report Issue

**Questions:**

- Microsoft Q&A: [Teams Development](https://learn.microsoft.com/answers/topics/microsoft-teams.html)
- Documentation: [Microsoft 365 Agents Toolkit](https://aka.ms/teams-toolkit-docs)
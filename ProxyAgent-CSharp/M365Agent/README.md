# Azure Agent for Microsoft 365

An intelligent agent that helps with Azure operations and tasks, built with Microsoft 365 Agents Toolkit.

## Quick Start

### Local Development (Debugging)
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

### Local Debug without SSO
1. Activate the #define DISABLE_SSO flag in AzureAgent.cs file 
2. Install the Microsoft 365 Agents Playground: https://learn.microsoft.com/en-us/microsoft-365/agents-sdk/test-with-toolkit-project?tabs=windows
3. In VS, set the debugging target to "AzureAgentToM365ATK"
4. In a terminal, use 'az login' and use an account that can call the Microsoft Foundry agent. This will be used by the DefaultAzureCredentials call. 
5. Press F5 to start debugging, find the http endpoint in the debug console
6. Launch in a terminal: 'agentsplayground -e "http://localhost:<your-agent-port>/api/messages"

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
- Azure App Service (hosts .NET 9 bot)
- Azure Bot Service (Teams integration)
- Entra ID App Registration (SSO)
- OAuth Connection (token exchange)

### Azure Resources (Local Development)
- App Registration (bot identity with client secret)
- Azure Bot Service (Teams integration with dynamic endpoint)
- SSO App Registration (federated credentials)
- OAuth Connection

---

## Project Structure

```
M365Agent/
├── appPackage/              # Teams app package
│   ├── manifest.json        # App manifest template
│   └── build/               # Generated manifests (.dev, .local)
├── env/                     # Environment configuration
│   ├── .env.dev            # Azure production environment
│   └── .env.local          # Local development environment
├── infra/                   # Infrastructure as Code
│   ├── azure.bicep         # Production deployment template
│   ├── azure-local.bicep   # Local development template
│   └── modules/            # Reusable Bicep modules
├── scripts/                 # Utility scripts
│   └── devtunnel.*         # Dev tunnel management
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

## Run the app on other platforms

The Teams app can run in other platforms like Outlook and Microsoft 365 app. See https://aka.ms/vs-ttk-debug-multi-profiles for more details.

---

## Get more info

New to Teams app development or Microsoft 365 Agents Toolkit? Explore Teams app manifests, cloud deployment, and much more in the https://aka.ms/teams-toolkit-vs-docs.

---

## Support

**Report an issue:**
- GitHub: [Microsoft 365 Agent Toolkit Issues](https://github.com/OfficeDev/TeamsFx/issues)
- VS Code: Help → Report Issue

**Questions:**
- Microsoft Q&A: [Teams Development](https://learn.microsoft.com/answers/topics/microsoft-teams.html)
- Documentation: [Microsoft 365 Agents Toolkit](https://aka.ms/teams-toolkit-docs)

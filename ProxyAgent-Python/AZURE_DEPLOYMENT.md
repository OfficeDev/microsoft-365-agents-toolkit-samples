# Azure Production Deployment Guide (Python)

Complete guide for deploying your M365 Agent to Azure for production or development environments using Microsoft 365 Agents Toolkit and Python.

---

## Table of Contents
- [Overview](#overview)
- [What Gets Deployed](#what-gets-deployed)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Deployment Steps](#detailed-deployment-steps)
- [Configuration Reference](#configuration-reference)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)
- [Cost Estimates](#cost-estimates)

---

## Overview

This deployment creates a complete, production-ready Azure infrastructure for your M365 Agent with:
- **Managed Identity authentication** (no passwords or secrets)
- **Single Sign-On (SSO)** with federated credentials
- **Scalable Azure App Service** hosting
- **Azure Bot Service** with Teams channel
- **Infrastructure as Code** using Bicep

**Deployment Files:**
- `infra/azure.bicep` - Main infrastructure template
- `infra/azure.parameters.json` - Parameter configuration
- `m365agents.yml` - Microsoft 365 Agents Toolkit orchestration

---

## What Gets Deployed

When you run `atk provision --env dev`, the following Azure resources are created:

| Resource | Purpose | Naming Pattern |
|----------|---------|----------------|
| **User Assigned Managed Identity** | Bot identity (no passwords!) | `{resourceBaseName}-identity` |
| **App Service Plan** | Compute resources (Linux) | `{resourceBaseName}-plan` |
| **Web App** | Hosts Python 3.12 bot application | `{resourceBaseName}-app` |
| **Azure Bot Service** | Azure Bot Service registration | `{resourceBaseName}-bot` |
| **Entra ID App Registration** | SSO authentication (Azure AI Foundry access) | `{resourceBaseName}-UserAuth` |
| **OAuth Connection** | SSO token exchange | `SsoConnection` |

**Example with `resourceBaseName=botprod123`:**
- Managed Identity: `botprod123-identity`
- App Service: `botprod123-app.azurewebsites.net`
- Bot Service: `botprod123`

---

## Architecture

```mermaid
graph TB
    subgraph Azure["Azure Subscription"]
        direction TB
        
        subgraph Step1["Step 1: Managed Identity"]
            Identity["User Assigned Identity<br/>- Bot authentication<br/>- No secrets required"]
        end
        
        subgraph Step2["Step 2: App Service"]
            AppServicePlan["App Service Plan (Linux, B1)"]
            WebApp["Web App (Python 3.12)<br/>- Uses Managed Identity<br/>- Health Check: /health<br/>- HTTPS Only<br/>- Always On<br/>- Oryx Build"]
            AppServicePlan --> WebApp
        end
        
        subgraph Step3["Step 3: Azure Bot"]
            BotService["Bot Service (Single Tenant)<br/>- Teams Channel (auto-enabled)<br/>- Uses Managed Identity<br/>- Messaging Endpoint"]
        end
        
        subgraph Step4["Step 4: App Registration"]
            SSOApp["Entra ID Application (SSO)<br/>- OAuth Scope: access_as_user<br/>- Federated Credentials<br/>- Pre-authorized Teams Clients"]
        end
        
        subgraph Step5["Step 5: OAuth Connection"]
            OAuth["Bot OAuth Connection<br/>- AAD v2 with Federated Creds<br/>- SSO Token Exchange<br/>- Scopes: openid profile"]
        end
        
        Identity --> WebApp
        Identity --> BotService
        WebApp --> BotService
        BotService --> SSOApp
        SSOApp --> OAuth
    end
    
    style Azure fill:#e1f5ff,stroke:#0078d4,stroke-width:2px
    style Step1 fill:#f0f0f0,stroke:#666,stroke-width:1px
    style Step2 fill:#f0f0f0,stroke:#666,stroke-width:1px
    style Step3 fill:#f0f0f0,stroke:#666,stroke-width:1px
    style Step4 fill:#f0f0f0,stroke:#666,stroke-width:1px
    style Step5 fill:#f0f0f0,stroke:#666,stroke-width:1px
```

---

## Prerequisites

### Required Tools

| Tool | Version | Installation |
|------|---------|--------------|
| **Azure CLI** | Latest | [Install Guide](https://learn.microsoft.com/cli/azure/install-azure-cli) |
| **Microsoft 365 Agents Toolkit CLI** | Latest | [Install Guide](https://aka.ms/m365agentstoolkit-cli) |
| **Python** | 3.12 | [Download](https://www.python.org/) |

**Installation Commands:**
```powershell
# Azure CLI
winget install Microsoft.AzureCLI

# Microsoft 365 Agents Toolkit CLI
npm install -g @microsoft/m365agentstoolkit-cli

# Verify installations
az --version
atk --version
python --version
```

### Required Azure Permissions

| Permission | Scope | Purpose |
|------------|-------|---------|
| **Contributor** | Subscription or Resource Group | Deploy Azure resources |
| **Application Administrator** | Entra ID | Create app registrations |

**Verify permissions:**
```powershell
# Check Azure login and subscription
az login
az account show

# Check assigned roles
az role assignment list --assignee $(az account show --query user.name -o tsv)
```

---

## Quick Start

### Step 1: Configure Environment Variables

Edit `env/.env.dev`:

```bash
# ============================================================================
# Azure AI Foundry Configuration (REQUIRED - Set these before provisioning)
# ============================================================================
AZURE_AI_FOUNDRY_PROJECT_ENDPOINT=<URL of your Azure AI Foundry endpoint>
AGENT_ID=<Agent ID that starts with asst_>

# Azure Subscription and Resource Group
AZURE_SUBSCRIPTION_ID=<your-subscription-id>
AZURE_RESOURCE_GROUP_NAME=<your-resource-group-name>

# Optional: Resource naming
RESOURCE_BASE_NAME=<unique-name-for-your-bot>
```

### Step 2: Provision Azure Infrastructure

**Using Microsoft 365 Agents Toolkit UI (Recommended):**
1. Open the **Microsoft 365 Agents Toolkit** extension panel in VS Code
2. Navigate to the **Lifecycle** section
3. Select environment: **dev**
4. Click **Provision** to create Azure resources

**What happens:**
1. ✅ Creates Teams app registration in Teams Developer Portal
2. ✅ Deploys Azure resources via `infra/azure.bicep`
3. ✅ Creates Managed Identity → App Service (Linux/Python 3.12) → Bot → App Registration → OAuth Connection
4. ✅ Captures all outputs to `env/.env.dev`
5. ✅ Builds and validates Teams app package
6. ✅ Registers app with Teams Developer Portal

**Expected output:**
```
✓ Teams app created successfully
✓ Provisioning Azure resources...
✓ Managed Identity created: <resourceBaseName>-identity
✓ App Service Plan created (Linux): <resourceBaseName>-plan
✓ Web App deployed: https://<resourceBaseName>-app.azurewebsites.net
✓ Bot Service registered: <resourceBaseName>-bot
✓ SSO App Registration created
✓ OAuth Connection configured
✓ Teams app package validated
✓ Provision completed successfully
```

**Duration:** ~5-8 minutes

> ⚠️ **Important: Admin Consent Required**
> 
> After provisioning completes, you must grant admin consent to the SSO app permissions:
> 1. Go to **Azure Portal** → **Microsoft Entra ID** → **App registrations**
> 2. Find your SSO app (e.g., `{resourceBaseName}-UserAuth`)
> 3. Navigate to **API permissions**
> 4. Click **Grant admin consent for [your tenant]**
> 5. Confirm by clicking **Yes**
>
> Without admin consent, users will not be able to authenticate and SSO will fail.

**Alternatively, using CLI:**
```powershell
# Using Microsoft 365 Agents Toolkit CLI
atk provision --env dev
```

### Step 3: Deploy Application Code

**Using Microsoft 365 Agents Toolkit UI (Recommended):**
1. In the **Microsoft 365 Agents Toolkit** extension panel
2. Navigate to the **Lifecycle** section
3. Select environment: **dev**
4. Click **Deploy** to publish application code

**What happens:**
1. ✅ Creates zip package (excludes files in `.webappignore`)
2. ✅ Uploads source code to Azure App Service
3. ✅ Azure uses **Oryx** to build the Python app (runs `pip install -r requirements.txt`)
4. ✅ Installs Python dependencies in virtual environment
5. ✅ Bot starts running: `python src/main.py`
6. ✅ Bot is now live at the messaging endpoint

**Expected output:**
```
✓ Building application...
✓ Publishing to Azure...
✓ Deployment completed successfully
✓ Bot endpoint: https://<resourceBaseName>-app.azurewebsites.net/api/messages
```

**Duration:** ~3-5 minutes (includes build time)

**Alternatively, using CLI:**
```powershell
# Using Microsoft 365 Agents Toolkit CLI
atk deploy --env dev
```

### Step 4: Install in Microsoft 365 Copilot & Microsoft Teams

**Note:** The app is automatically registered in Teams Developer Portal during provisioning. However, you can manually install it if needed:

1. Open **Microsoft Teams**
2. Go to **Apps** → **Manage your apps**
3. Click **Upload an app** → **Upload a custom app**
4. Select: `appPackage/build/appPackage.dev.zip`
5. Click **Add** to install your bot
6. Start chatting with your Azure AI Foundry proxy agent in Teams or find it in Microsoft 365 Copilot

---

## Detailed Deployment Steps

### Step 1: Managed Identity Creation

**Module:** `modules/bot-managedidentity.bicep`

**Purpose:** Creates a user-assigned managed identity that serves as the bot's identity, eliminating the need for passwords or client secrets.

**Resources Created:**
```
Resource Type: Microsoft.ManagedIdentity/userAssignedIdentities
Name: {resourceBaseName}-identity
Location: Same as resource group
```

**Key Outputs:**
- `identityId`: Full resource ID
- `identityClientId`: Client ID (used as BOT_ID)
- `identityPrincipalId`: Principal ID for RBAC assignments

**Why It Matters:**
- ✅ No secrets to manage or rotate
- ✅ Secure authentication to Azure services
- ✅ Integrated Azure RBAC support
- ✅ Used as bot's identity in Azure Bot Service

---

### Step 2: App Service Deployment

**Module:** `modules/appservice.bicep`

**Purpose:** Creates the compute infrastructure to host your Python 3.12 bot application.

**Resources Created:**

1. **App Service Plan**
   - OS: Linux
   - SKU: B1 (Basic) - configurable
   - Reserved: true (required for Linux)

2. **Web App**
   - Runtime: Python 3.12 (`linuxFxVersion: 'PYTHON|3.12'`)
   - Identity: User Assigned Managed Identity
   - HTTPS: Enforced
   - Always On: Enabled
   - Health Check: `/health` endpoint
   - Start Command: `python src/main.py`
   - Oryx Build: Enabled (builds from source)

**Configuration Applied:**
```json
{
  "SCM_DO_BUILD_DURING_DEPLOYMENT": "true",
  "ENABLE_ORYX_BUILD": "true",
  "AZURE_CLIENT_ID": "{managed-identity-client-id}",
  "MicrosoftAppType": "UserAssignedMSI",
  "MicrosoftAppId": "{managed-identity-client-id}",
  "MicrosoftAppTenantId": "{tenant-id}",
  "AZURE_AI_FOUNDRY_PROJECT_ENDPOINT": "{ai-foundry-endpoint}",
  "AGENT_ID": "{agent-id}",
  "OAUTHCONNECTIONNAME": "SsoConnection"
}
```

**Key Outputs:**
- `webAppName`: App Service name
- `webAppHostName`: Public hostname (e.g., `botprod123-app.azurewebsites.net`)
- `webAppResourceId`: Full resource ID for deployment target
- `webAppPrincipalId`: Principal ID for permissions

**Features:**
- ✅ Auto-scaling capable (upgrade SKU to enable)
- ✅ Deployment slots support
- ✅ Built-in monitoring with health checks
- ✅ CORS configured for Azure Portal

---

### Step 3: Bot Service Registration

**Module:** `modules/azurebot.bicep`

**Purpose:** Registers your web service as a bot with Azure Bot Service and enables Teams channel.

**Resources Created:**

1. **Bot Service**
   ```
   Kind: azurebot
   Location: global
   SKU: F0 (Free) or S1 (Standard)
   ```

2. **Teams Channel**
   - Automatically enabled
   - No additional configuration needed

**Configuration:**
```json
{
  "displayName": "{botDisplayName}",
  "endpoint": "https://{webAppHostName}/api/messages",
  "msaAppId": "{managed-identity-client-id}",
  "msaAppTenantId": "{tenant-id}",
  "msaAppType": "UserAssignedMSI",
  "msaAppMSIResourceId": "{managed-identity-resource-id}"
}
```

**Key Outputs:**
- `botServiceName`: Name of the bot service
- `botEndpoint`: Messaging endpoint URL

**Features:**
- ✅ Integrated with Managed Identity
- ✅ Teams channel pre-configured
- ✅ Additional channels available (Slack, Web Chat, etc.)
- ✅ No passwords or secrets required

---

### Step 4: App Registration for SSO

**Module:** `modules/app-registration.bicep`

**Purpose:** Creates an Entra ID application for Single Sign-On (SSO) authentication with federated credentials.

**Resources Created:**

1. **Application Registration**
   ```
   Display Name: {botDisplayName}
   Sign-in Audience: AzureADMyOrg (Single Tenant)
   ```

2. **OAuth2 Permission Scope**
   ```
   Scope: access_as_user
   Display Name: Access as the user
   Type: User
   ```

3. **Federated Identity Credential**
   ```
   Subject: /eid1/c/pub/t/{encodedTenantId}/a/{encodedAppId}/{uniqueId}
   Issuer: https://token.botframework.com/
   Audience: api://botframework.com
   ```

4. **Pre-authorized Client Applications**
   - Microsoft Teams (Desktop/Mobile)
   - Microsoft Teams (Web)
   - Microsoft 365 Web Client
   - Microsoft 365 Desktop Client

**Key Outputs:**
- `aadAppId`: Application (client) ID
- `aadAppObjectId`: Object ID
- `aadAppIdUri`: Application ID URI (e.g., `api://botprod123-app.azurewebsites.net/{guid}`)
- `servicePrincipalId`: Service Principal ID

**Features:**
- ✅ Federated credentials (no client secrets)
- ✅ Pre-configured for Teams SSO
- ✅ Proper OAuth scopes
- ✅ Secure token exchange

**Note:** The module uses `guid-encoder.bicep` to properly encode GUIDs for federated credentials.

---

### Step 5: OAuth Connection

**Module:** `modules/bot-oauth-connection.bicep`

**Purpose:** Configures the OAuth connection between the bot and the SSO app registration.

**Resources Created:**
```
Resource: Microsoft.BotService/botServices/connections
Connection Name: SsoConnection
Service Provider: Azure Active Directory v2
```

**Configuration:**
```json
{
  "clientId": "{sso-app-id}",
  "tokenExchangeUrl": "{app-id-uri}",
  "scopes": "openid profile offline_access",
  "tenantId": "{tenant-id}"
}
```

**Key Outputs:**
- `oauthConnectionName`: Connection name (`SsoConnection`)

**Features:**
- ✅ Azure AD v2 authentication
- ✅ Uses federated credentials
- ✅ Token exchange for SSO
- ✅ Refresh token support

---

## Configuration Reference

### Environment Variables (.env.dev)

#### User-Provided Variables
```bash
# Azure subscription and resource group
AZURE_SUBSCRIPTION_ID=<guid>
AZURE_RESOURCE_GROUP_NAME=rg-m365agent-prod

# Resource naming
RESOURCE_SUFFIX=prod123        # Must be globally unique
APP_NAME_SUFFIX=dev           # Appended to display name

# Azure AI Foundry Configuration
AZURE_AI_FOUNDRY_PROJECT_ENDPOINT=<your-ai-foundry-endpoint>
AGENT_ID=<your-agent-id-starting-with-asst_>

# Environment
TEAMSFX_ENV=dev
```

#### Auto-Populated Variables
These are automatically set during `atk provision`:

```bash
# Teams App
TEAMS_APP_ID=<guid>
TEAMS_APP_TENANT_ID=<guid>

# Bot Identity (Managed Identity)
BOT_ID=<guid>
identityId=/subscriptions/.../Microsoft.ManagedIdentity/userAssignedIdentities/...
identityPrincipalId=<guid>

# App Service
BOT_AZURE_APP_SERVICE_RESOURCE_ID=/subscriptions/.../Microsoft.Web/sites/...
webAppName=botprod123-app
webAppHostName=botprod123-app.azurewebsites.net
webAppUrl=https://botprod123-app.azurewebsites.net

# Bot Service
botEndpoint=https://botprod123-app.azurewebsites.net/api/messages

# App Registration (SSO)
AAD_APP_CLIENT_ID=<guid>
AAD_APP_OBJECT_ID=<guid>
AAD_APP_ID_URI=api://botprod123-app.azurewebsites.net/<guid>
servicePrincipalId=<guid>

# OAuth Connection
oauthConnectionName=SsoConnection
```

### Python Dependencies

The bot uses the following key Python packages (defined in `src/requirements.txt`):

```
python-dotenv
aiohttp
typing_extensions>=4.15.0
microsoft-agents-hosting-aiohttp
microsoft-agents-hosting-core
microsoft-agents-authentication-msal
microsoft-agents-activity
azure-ai-projects
azure-identity
```

These are automatically installed by Azure Oryx during deployment.

---

## Verification

### 1. Verify Azure Resources

```powershell
# List all resources in the resource group
az resource list --resource-group rg-m365agent-prod --output table

# Check Web App status
az webapp show --name botprod123-app --resource-group rg-m365agent-prod --query state

# Check Bot Service
az bot show --name botprod123 --resource-group rg-m365agent-prod

# Test Web App endpoint
curl https://botprod123-app.azurewebsites.net/health
```

### 2. Verify Teams App

1. Open **Microsoft Teams**
2. Go to **Apps** → **Built for your org**
3. Find your app and click it
4. Click **Add** if not already installed
5. Send a message to the bot
6. Verify you get a response

### 3. Verify SSO

1. In Teams, send a message that requires authentication
2. You should see a sign-in card
3. Click **Sign In**
4. If SSO is working, you'll be signed in automatically (no additional prompts)
5. Bot should receive your authentication token

### 4. Check Logs

```powershell
# Stream Web App logs
az webapp log tail --name botprod123-app --resource-group rg-m365agent-prod

# View recent log entries
az webapp log download --name botprod123-app --resource-group rg-m365agent-prod --log-file logs.zip
```

---

## Troubleshooting

### Provision Failed: "Subscription not found"

**Problem:** Azure subscription ID is incorrect or you don't have access.

**Solution:**
```powershell
# List available subscriptions
az account list --output table

# Set the correct subscription
az account set --subscription <subscription-id>

# Update .env.dev with correct AZURE_SUBSCRIPTION_ID
```

---

### Provision Failed: "Resource name already exists"

**Problem:** The `RESOURCE_SUFFIX` is not unique globally.

**Solution:**
1. Choose a different suffix in `.env.dev`
2. Update `RESOURCE_SUFFIX=prod456` (use random characters)
3. Run `atk provision --env dev` again

---

### Deploy Failed: "Could not find resource"

**Problem:** Provision step didn't complete successfully.

**Solution:**
1. Check if resources exist: `az resource list --resource-group <rg-name>`
2. If missing, run: `atk provision --env dev`
3. Then retry: `atk deploy --env dev`

---

### Bot Not Responding in Teams

**Checklist:**
1. ✅ Verify Web App is running:
   ```powershell
   az webapp show --name botprod123-app --resource-group rg-m365agent-prod --query state
   ```

2. ✅ Test health endpoint:
   ```powershell
   curl https://botprod123-app.azurewebsites.net/health
   ```

3. ✅ Check bot endpoint in Azure Portal:
   - Go to Bot Service → Configuration
   - Verify messaging endpoint matches Web App URL + `/api/messages`

4. ✅ Check application logs:
   ```powershell
   az webapp log tail --name botprod123-app --resource-group rg-m365agent-prod
   ```

5. ✅ Verify Python environment:
   - Check logs for "Python path priority" messages
   - Ensure virtual environment is properly configured
   - Verify all dependencies are installed

---

### Python Import Errors

**Problem:** Module not found or import errors in logs.

**Solution:**
1. Verify `requirements.txt` is complete
2. Check Oryx build logs in Azure Portal
3. Ensure `SCM_DO_BUILD_DURING_DEPLOYMENT=true`
4. Redeploy with `atk deploy --env dev`

---

### SSO Not Working

**Checklist:**
1. ✅ Verify `webApplicationInfo` in manifest:
   - Open `appPackage/build/manifest.dev.json`
   - Check `id` matches `AAD_APP_CLIENT_ID`
   - Check `resource` matches `AAD_APP_ID_URI`

2. ✅ Verify OAuth connection:
   ```powershell
   az bot authsetting show --name botprod123 --resource-group rg-m365agent-prod --setting-name SsoConnection
   ```

3. ✅ Check federated credentials:
   - Go to Azure Portal → Entra ID → App Registrations
   - Find your SSO app
   - Check **Certificates & secrets** → **Federated credentials**
   - Should see credential with issuer `https://token.botframework.com/`

4. ✅ Verify pre-authorized clients:
   - In App Registration → **Expose an API**
   - Check **Authorized client applications**
   - Should see Teams client IDs

---

### Permission Denied Errors

**Problem:** Insufficient permissions to create resources.

**Required Roles:**
- **Azure:** Contributor on subscription or resource group
- **Entra ID:** Application Administrator or Cloud Application Administrator

**Solution:**
```powershell
# Check current role assignments
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Request required permissions from your Azure administrator
```

---

## Cost Estimates

Monthly cost estimates for Azure resources (USD, as of 2025):

### Basic Development (B1 + Free Bot)
| Resource | SKU | Cost/Month |
|----------|-----|------------|
| App Service Plan | B1 (Linux) | ~$13 |
| Bot Service | F0 (Free) | $0 |
| Managed Identity | - | $0 |
| App Registration | - | $0 |
| **Total** | | **~$13/month** |

### Standard Production (S1 + Standard Bot)
| Resource | SKU | Cost/Month |
|----------|-----|------------|
| App Service Plan | S1 (Linux) | ~$70 |
| Bot Service | S1 (Standard) | ~$0.50 per 1,000 messages |
| Managed Identity | - | $0 |
| App Registration | - | $0 |
| **Total** | | **~$70-100/month** |

### Premium Production (P1v2 + Standard Bot)
| Resource | SKU | Cost/Month |
|----------|-----|------------|
| App Service Plan | P1v2 (Linux) | ~$146 |
| Bot Service | S1 (Standard) | ~$0.50 per 1,000 messages |
| Application Insights | Standard | ~$2-10 (if enabled) |
| **Total** | | **~$150-200/month** |

**Notes:**
- Costs vary by Azure region
- Bot Service F0 tier limited to 10,000 messages/month
- App Service includes 99.95% SLA
- Linux App Service Plans are typically cheaper than Windows
- Additional costs may apply for data transfer and storage

**Cost Optimization Tips:**
- Start with B1 tier for development (only $13/month)
- Use F0 bot tier for low-traffic scenarios
- Scale up to S1/P1v2 only when needed
- Enable auto-shutdown for dev environments
- Use Azure Cost Management for monitoring

---

## Advanced Topics

### Scaling Your Deployment

**Horizontal Scaling (Multiple Instances):**
```powershell
# Scale out to 3 instances
az appservice plan update --name botprod123-plan --resource-group rg-m365agent-prod --number-of-workers 3
```

**Vertical Scaling (Larger SKU):**
```powershell
# Upgrade to S1 tier
az appservice plan update --name botprod123-plan --resource-group rg-m365agent-prod --sku S1
```

### Enabling Application Insights

Edit `azure.parameters.json`:
```json
{
  "enableAppInsights": {
    "value": true
  }
}
```

Re-run provision:
```powershell
atk provision --env dev
```

### Multiple Environments

Create separate environments for dev, staging, and production:

```powershell
# Development
cp env/.env.dev env/.env.dev
# Edit with dev settings

# Staging
cp env/.env.dev env/.env.staging
# Edit with staging settings

# Production
cp env/.env.dev env/.env.prod
# Edit with production settings

# Deploy to each environment
atk provision --env dev
atk provision --env staging
atk provision --env prod
```

---

## Summary

You've successfully deployed your M365 Agent to Azure! 🎉

**Next Steps:**
1. ✅ Test your bot in Teams
2. ✅ Configure SSO and test authentication
3. ✅ Set up monitoring and alerts
4. ✅ Plan for scaling and high availability
5. ✅ Implement CI/CD for automated deployments

**Resources:**
- [Microsoft 365 Agents Toolkit Documentation](https://aka.ms/teams-toolkit-docs)
- [Azure Bot Service Documentation](https://learn.microsoft.com/azure/bot-service/)
- [Bicep Documentation](https://learn.microsoft.com/azure/azure-resource-manager/bicep/)
- [Microsoft 365 Agents SDK](https://github.com/microsoft/agents)

**Support:**
- GitHub Issues: [Microsoft 365 Agents Toolkit Repository](https://github.com/OfficeDev/TeamsFx/issues)
- Microsoft Q&A: [Teams Development](https://learn.microsoft.com/answers/topics/microsoft-teams.html)

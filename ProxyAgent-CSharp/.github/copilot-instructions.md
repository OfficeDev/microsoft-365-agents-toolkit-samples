# GitHub Copilot Instructions for Microsoft Foundry Agent for M365

## Project Overview
This is a proxy solution that connects Microsoft Foundry agents to Microsoft 365 Copilot and Teams using the Microsoft 365 Agents Toolkit.

## Technology Stack
- **.NET 9** - Bot application runtime
- **Microsoft 365 Agents SDK** - Microsoft 365 Agents SDK
- **Microsoft 365 Agents Toolkit** - Formerly Teams Toolkit
- **Microsoft Foundry Agent SDK** - For agent integration
- **Bicep** - Infrastructure as Code
- **Managed Identity** - For production authentication (no secrets)

## Architecture Patterns
- Use the proxy pattern to route messages between M365 Copilot and Microsoft Foundry
- Bot Service acts as the messaging endpoint
- Managed Identity for authentication in production
- Client Secret + Single Tenant for local development
- SSO with federated credentials (no client secrets in SSO flow)

## Coding Standards
- Use C# 12 features and nullable reference types
- Follow async/await patterns consistently
- Use dependency injection for services
- Implement proper error handling and logging
- Use configuration-based settings (appsettings.json)

## Key Components
- `AzureAgent.cs` - Main agent integration logic
- `Program.cs` - Bot setup and middleware configuration
- Bicep modules - Reusable infrastructure components
- `m365agents.yml` - Orchestration for provisioning and deployment

## Common Patterns
- SSO authentication uses federated credentials
- Bot responds via `turnContext.SendActivityAsync()`
- Environment-specific configuration via `appsettings.{Environment}.json`
- Infrastructure deployments use conditional logic (first-time vs. update)

## Security Best Practices
- Never commit secrets or `.env` files
- Use Managed Identity in production (no secrets)
- Use federated credentials for SSO (no client secrets)
- Keep `appsettings.Development.json` in `.gitignore`

## Naming Conventions
- Bicep modules: lowercase with hyphens (e.g., `app-registration.bicep`)
- C# classes: PascalCase
- Environment variables: UPPER_SNAKE_CASE
- Resource names: Use consistent naming pattern with suffix

## Deployment
- Local: Press F5 in VS Code (automatic provisioning)
- Azure: Use `atk provision` and `atk deploy` commands
- Two deployment modes: Local (dev tunnel) and Production (Azure App Service)

## Testing
- Local debugging via F5 in VS Code
- Automatic sideloading in Teams/M365 Copilot
- Test SSO flow with federated credentials
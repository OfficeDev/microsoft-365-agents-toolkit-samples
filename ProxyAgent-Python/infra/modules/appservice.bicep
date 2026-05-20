// Azure App Service Module for Python Application
// This module deploys an App Service Plan and App Service with managed identity

@maxLength(20)
@minLength(4)
@description('Used to generate names for all resources in this file')
param resourceBaseName string

@description('The resource ID of the User Assigned Managed Identity')
param MSIid string 

@description('Location for all resources')
param location string = resourceGroup().location

@description('The name of the App Service Plan')
param serverfarmsName string = resourceBaseName

@description('The name of the Web App')
param webAppName string = resourceBaseName

@description('The SKU for the App Service Plan')
param webAppSKU string

@description('Additional app settings for the Web App')
param additionalAppSettings array = []

@description('Enable Application Insights')
param enableAppInsights bool = true

@description('Application Insights connection string (for managed identity authentication)')
param appInsightsConnectionString string = ''

// Bot Configuration (for appsettings.json template variables)
@description('Bot ID (Managed Identity Client ID)')
param botId string

@description('Bot Tenant ID')
param botTenantId string

@description('OAuth Connection Name')
param oauthConnectionName string

// AI Services Configuration (optional)
@description('Azure AI Foundry Project Endpoint (optional)')
param azureAIFoundryEndpoint string = ''

@description('AI Foundry OAuth Connection Name')
param aifoundryConnectionName string = 'aifoundryaccess'

@description('Azure AI Agent ID (optional)')
param azureAIAgentId string = ''

// App Service Plan - Compute resources for your Web App
resource serverfarm 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: serverfarmsName
  location: location
  kind: 'app,linux'
  sku: {
    name: webAppSKU
  }
  properties: {
    reserved: true // false = Windows, true = Linux
  }
}

// Web App that hosts your Python agent
resource webApp 'Microsoft.Web/sites@2023-12-01' = {
  name: webAppName
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: serverfarm.id
    httpsOnly: true
    clientAffinityEnabled: false
    siteConfig: {
      alwaysOn: true
      http20Enabled: true
      minTlsVersion: '1.2'
      ftpsState: 'FtpsOnly'
      appCommandLine: 'python main.py'
      linuxFxVersion: 'PYTHON|3.12'
      healthCheckPath: '/health'
      logsDirectorySizeLimit: 100
      detailedErrorLoggingEnabled: true
      httpLoggingEnabled: true
      requestTracingEnabled: true
      appSettings: concat([
        {
          name: 'WEBSITES_CONTAINER_START_TIME_LIMIT'
          value: '900'
        }
        {
          name: 'SCM_DO_BUILD_DURING_DEPLOYMENT'
          value: 'true'
        }
        {
          name: 'POST_BUILD_COMMAND'
          value: 'pip install --force-reinstall --no-cache-dir typing-extensions==4.12.2 && pip install --force-reinstall --no-cache-dir pydantic-core'
        }
        // Application-specific configuration (used by src/config.ts and src/agent.ts)
        {
          name: 'AZURE_AI_FOUNDRY_PROJECT_ENDPOINT'
          value: azureAIFoundryEndpoint
        }
        {
          name: 'AGENT_ID'
          value: azureAIAgentId
        }
        {
          name: 'OAUTHCONNECTIONNAME'
          value: oauthConnectionName
        }
        {
          name: 'AIFOUNDRYCONNECTIONNAME'
          value: aifoundryConnectionName
        }
        {
          name: 'CONNECTIONS__SERVICE_CONNECTION__SETTINGS__AUTHTYPE'
          value: 'UserManagedIdentity'
        }
        {
          name: 'CONNECTIONS__SERVICE_CONNECTION__SETTINGS__CLIENTID'
          value: botId
        }
        {
          name: 'CONNECTIONS__SERVICE_CONNECTION__SETTINGS__TENANTID'
          value: botTenantId
        }
      ], enableAppInsights && !empty(appInsightsConnectionString) ? [
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsightsConnectionString
        }
        {
          name: 'ApplicationInsightsAgent_EXTENSION_VERSION'
          value: '~3'
        }
        {
          name: 'XDT_MicrosoftApplicationInsights_Mode'
          value: 'recommended'
        }
      ] :       [], additionalAppSettings)
      cors: {
        allowedOrigins: [
          'https://portal.azure.com'
          'https://ms.portal.azure.com'
        ]
        supportCredentials: false
      }
      metadata: [
        {
          name: 'CURRENT_STACK'
          value: 'python'
        }
      ]
    }
  }
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${MSIid}': {}
    }
  }
}

// Outputs for use in other modules
output webAppName string = webApp.name
output webAppId string = webApp.id
output webAppHostName string = webApp.properties.defaultHostName
output webAppPrincipalId string = reference(MSIid, '2023-01-31').principalId
output appServicePlanId string = serverfarm.id

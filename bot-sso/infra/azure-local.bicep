// Local development Bicep for bot-sso
// Creates: Azure Bot Service + Teams channel + OAuth connection "SSOSelf" for Teams SSO
// The OAuth connection uses AAD v2 with TokenExchangeUrl to exchange the Teams SSO token
// for a Graph token via OBO (On-Behalf-Of), using the SSO AAD app credentials.

targetScope = 'resourceGroup'

@description('The Bot ID (Microsoft App ID) - created by aadApp/create action')
param botId string

@description('Bot messaging endpoint (e.g., https://abc123-3978.devtunnels.ms)')
param botEndpoint string

@description('The tenant ID for the bot application')
param botAppTenantId string

@description('The SSO AAD application client ID (for the OAuth connection)')
param ssoAppClientId string

@description('The SSO AAD application client secret (for the OAuth connection OBO)')
@secure()
param ssoAppClientSecret string

@description('The tenant ID for the SSO AAD application')
param ssoAppTenantId string

@description('The name of the OAuth connection for SSO')
param botSsoConnectionName string = 'SSOSelf'

@description('OAuth scopes to grant via OBO exchange')
param oauthScopes string = 'User.Read'

// Derive a unique but deterministic Azure Bot Service resource name from the BOT_ID
// Prefix 'bsso-' (5 chars) + GUID (36 chars) = 41 chars, within Azure limit of 42
var botServiceName = 'bsso-${toLower(botId)}'

// Azure Bot Service (Single Tenant with client secret)
resource botService 'Microsoft.BotService/botServices@2022-09-15' = {
  kind: 'azurebot'
  location: 'global'
  name: botServiceName
  properties: {
    displayName: 'sso-bot-local'
    endpoint: '${botEndpoint}/api/messages'
    msaAppId: botId
    msaAppTenantId: botAppTenantId
    msaAppType: 'SingleTenant'
  }
  sku: {
    name: 'F0'
  }
}

// Connect the bot to Microsoft Teams
resource teamsChannel 'Microsoft.BotService/botServices/channels@2022-09-15' = {
  parent: botService
  location: 'global'
  name: 'MsTeamsChannel'
  properties: {
    channelName: 'MsTeamsChannel'
  }
}

// OAuth connection "SSOSelf" for Teams SSO token exchange
// Teams sends a signin/tokenExchange invoke with the Teams SSO token (audience: api://botid-{botId}).
// Azure Bot Service uses this connection to exchange it for a Graph token via OBO.
resource oauthConnection 'Microsoft.BotService/botServices/connections@2022-09-15' = {
  parent: botService
  location: 'global'
  name: botSsoConnectionName
  properties: {
    serviceProviderId: '30dd229c-58e3-4a48-bdfd-91ec48eb906c' // Azure Active Directory v2
    serviceProviderDisplayName: 'Azure Active Directory v2'
    clientId: ssoAppClientId
    clientSecret: ssoAppClientSecret
    scopes: oauthScopes
    parameters: [
      {
        key: 'ClientId'
        value: ssoAppClientId
      }
      {
        key: 'ClientSecret'
        value: ssoAppClientSecret
      }
      {
        key: 'TenantId'
        value: ssoAppTenantId
      }
      {
        key: 'TokenExchangeUrl'
        value: 'api://botid-${botId}'
      }
    ]
  }
}

output BOT_SERVICE_NAME string = botService.name

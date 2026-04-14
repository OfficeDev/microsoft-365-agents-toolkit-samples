@maxLength(20)
@minLength(4)
@description('Used to generate names for all resources in this file')
param resourceBaseName string

@maxLength(42)
param botDisplayName string

param botServiceName string = resourceBaseName
param botServiceSku string = 'F0'
param identityResourceId string
param identityClientId string
param identityTenantId string
param botAppDomain string

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

// Register your web service as a bot with the Bot Framework
resource botService 'Microsoft.BotService/botServices@2021-03-01' = {
  kind: 'azurebot'
  location: 'global'
  name: botServiceName
  properties: {
    displayName: botDisplayName
    endpoint: 'https://${botAppDomain}/api/messages'
    msaAppId: identityClientId
    msaAppMSIResourceId: identityResourceId
    msaAppTenantId:identityTenantId
    msaAppType:'UserAssignedMSI'
  }
  sku: {
    name: botServiceSku
  }
}

// Connect the bot service to Microsoft Teams
resource botServiceMsTeamsChannel 'Microsoft.BotService/botServices/channels@2021-03-01' = {
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
        value: 'api://botid-${identityClientId}'
      }
    ]
  }
}

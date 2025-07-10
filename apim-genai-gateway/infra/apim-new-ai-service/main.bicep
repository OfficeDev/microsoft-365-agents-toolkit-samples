@maxLength(20)
@minLength(4)
@description('Used to generate names for all resources in this file')
param resourceBaseName string

param location string = resourceGroup().location

@description('The pricing tier of this API Management service')
@allowed([
  'Basic'
  'BasicV2'
  'Consumption'
  'Developer'
  'Isolated'
  'Premium'
  'Standard'
  'StandardV2'
])
param apimSku string

@description('SKU for the Content Safety service')
@allowed([
  'F0'  // Free tier
  'S0'  // Standard tier
])
param contentSafetySku string

@description('SKU for the AI Services')
@allowed([
  'F0'  // Free tier
  'S0'  // Standard tier
])
param aiServicesSku string

@description('Whether to enable Content Safety integration')
param enableContentSafety bool

@description('The email address of the owner of the service')
param apimPublisherEmail string = 'noreply@microsoft.com'

@description('The name of the owner of the service')
param apimPublisherName string = 'Microsoft'

param embeddingsDeploymentName string = 'text-embedding-ada-002'

module apimService './modules/apimService.bicep' = {
  name: 'Apim-Service-deployment'
  params: {
    resourceBaseName: resourceBaseName
    location: location
    apimSku: apimSku
    apimPublisherEmail: apimPublisherEmail
    apimPublisherName: apimPublisherName
  }
}

module contentSafety './modules/contentSafety.bicep' = if (enableContentSafety) {
  name: 'Content-Safety-deployment'
  params: {
    resourceBaseName: resourceBaseName
    location: location
    contentSafetySku: contentSafetySku
  }
  dependsOn: [
    apimService // Ensure APIM service exists first since contentSafety references it
  ]
}

module aiService1 './modules/aiService.bicep' = {
  name: 'AI-Service-1-deployment'
  params: {
    resourceBaseName: resourceBaseName
    serviceSuffix: '1'
    location: location
    aiServicesSku: aiServicesSku
  }
}

module aiService2 './modules/aiService.bicep' = {
  name: 'AI-Service-2-deployment'
  params: {
    resourceBaseName: resourceBaseName
    serviceSuffix: '2'
    location: location
    aiServicesSku: aiServicesSku
  }
}

module semanticCache './modules/semanticCache.bicep' = {
 name: 'Semantic-Cache-deployment'
 params: {
   resourceBaseName: resourceBaseName
   location: location
   azureOpenAIKey: aiService1.outputs.aiServiceApiKey
   azureOpenAIEndpoint: aiService1.outputs.aiServiceEndpoint
   embeddingsDeploymentName: embeddingsDeploymentName
 }
 dependsOn: [
   apimService // Ensure APIM service exists first since semanticCache references it
 ]
}

module apiBackends './modules/apiBackends.bicep' = {
  name: 'AI-Service-Backends-deployment'
  params: {
    resourceBaseName: resourceBaseName
    aiService1Key: aiService1.outputs.aiServiceApiKey
    aiService1Endpoint: aiService1.outputs.aiServiceEndpoint
    aiService2Key: aiService2.outputs.aiServiceApiKey
    aiService2Endpoint: aiService2.outputs.aiServiceEndpoint
  }
  dependsOn: [
    apimService // Ensure APIM service exists first since aiServiceBackends references it
  ]
}

module emitTokenMetrics './modules/emitTokenMetrics.bicep' = {
  name: 'Emit-Token-Metrics-deployment'
  params: {
    resourceBaseName: resourceBaseName
    location: location
  }
  dependsOn: [
    apimService // Ensure APIM service exists first since emitTokenMetrics references it
    apiBackends // Ensure the AIServices API is created before trying to reference it
  ]
}

output AZURE_OPENAI_ENDPOINT string = apimService.outputs.gatewayUrl

#disable-next-line outputs-should-not-contain-secrets
output SECRET_AZURE_OPENAI_API_KEY string = apiBackends.outputs.subscriptionPrimaryKey

output AZURE_OPENAI_DEPLOYMENT_NAME string = aiService1.outputs.aiServiceDeploymentName

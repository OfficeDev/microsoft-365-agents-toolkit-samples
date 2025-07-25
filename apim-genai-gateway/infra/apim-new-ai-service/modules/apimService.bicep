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

@description('The email address of the owner of the service')
param apimPublisherEmail string = 'noreply@microsoft.com'

@description('The name of the owner of the service')
param apimPublisherName string = 'Microsoft'

resource apimService 'Microsoft.ApiManagement/service@2024-05-01' = {
  name: 'apim-${resourceBaseName}'
  location: location
  sku: {
    name: apimSku
    capacity: 1
  }
  properties: {
    publisherEmail: apimPublisherEmail
    publisherName: apimPublisherName
  }
}

output gatewayUrl string = apimService.properties.gatewayUrl

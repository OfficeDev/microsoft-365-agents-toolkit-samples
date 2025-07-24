param resourceBaseName string

param aiService1Endpoint string
param aiService2Endpoint string

@secure()
param aiService1Key string

@secure()
param aiService2Key string

resource apimService 'Microsoft.ApiManagement/service@2023-05-01-preview' existing = {
  name: 'apim-${resourceBaseName}'
}

// Create API for AIServices (supports OpenAI compatible endpoints)
resource api 'Microsoft.ApiManagement/service/apis@2023-05-01-preview' = {
  name: 'AIServices'
  parent: apimService
  properties: {
    apiType: 'http'
    description: 'Azure AI Services API with OpenAI compatibility'
    displayName: 'AIServices'
    format: 'openapi-link'
    path: 'openai'
    protocols: [
      'https'
    ]
    subscriptionKeyParameterNames: {
      header: 'api-key'
      query: 'api-key'
    }
    subscriptionRequired: true
    type: 'http'
    value: 'https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/cognitiveservices/data-plane/AzureOpenAI/inference/stable/2024-02-01/inference.json'
  }
}

resource apiPolicy 'Microsoft.ApiManagement/service/apis/policies@2021-12-01-preview' = {
  name: 'policy'
  parent: api
  dependsOn: [backendPoolAIServices]
  properties: {
    format: 'rawxml'
    value: loadTextContent('../policy.xml')
  }
}

// Create backend for AIServices 1
resource backendAIServices1 'Microsoft.ApiManagement/service/backends@2024-05-01' = {
  name: 'AIServices1'
  parent: apimService
  properties: {
    description: 'Azure AI Services backend 1'
    type: 'Single'
    protocol: 'http'
    url: '${aiService1Endpoint}/openai'
    credentials: {
      header: {
        'api-key': [aiService1Key]
      }
    }
    circuitBreaker: {
      rules: [
        {
          failureCondition: {
            count: 3
            errorReasons: [
              'Server errors'
            ]
            interval: 'PT5M'
            statusCodeRanges: [
              {
                min: 429
                max: 429
              }
            ]
          }
          name: 'aiServices1BreakerRule'
          tripDuration: 'PT1M'
        }
      ]
    }
  }
}

// Create backend for AIServices 2
resource backendAIServices2 'Microsoft.ApiManagement/service/backends@2024-05-01' = {
  name: 'AIServices2'
  parent: apimService
  properties: {
    description: 'Azure AI Services backend 2'
    type: 'Single'
    protocol: 'http'
    url: '${aiService2Endpoint}/openai'
    credentials: {
      header: {
        'api-key': [aiService2Key]
      }
    }
    circuitBreaker: {
      rules: [
        {
          failureCondition: {
            count: 3
            errorReasons: [
              'Server errors'
            ]
            interval: 'PT5M'
            statusCodeRanges: [
              {
                min: 429
                max: 429
              }
            ]
          }
          name: 'aiServices2BreakerRule'
          tripDuration: 'PT1M'
        }
      ]
    }
  }
}

// Create backend pool for load balancing (includes both AIServices endpoints)
resource backendPoolAIServices 'Microsoft.ApiManagement/service/backends@2024-05-01' = {
  name: 'aiservices-backend-pool'
  parent: apimService
  dependsOn: [backendAIServices1, backendAIServices2]
  properties: {
    description: 'Load balancer for multiple AI Services endpoints'
    type: 'Pool'
    pool: {
      services: [
        {
          id: '/backends/AIServices1'
          weight: 50
          priority: 1
        }
        {
          id: '/backends/AIServices2'
          weight: 50
          priority: 1
        }
      ]
    }
  }
}

// Create subscription for the AI Services API
resource apimSubscription 'Microsoft.ApiManagement/service/subscriptions@2023-05-01-preview' = {
  name: 'aiservices-subscription'
  parent: apimService
  properties: {
    allowTracing: true
    displayName: 'AI Services Subscription'
    scope: '/apis/${api.id}'
    state: 'active'
  }
}

// Secret subscription key is not output for security reasons
// Use the get-api-key.ps1 script to retrieve the subscription primary key after deployment

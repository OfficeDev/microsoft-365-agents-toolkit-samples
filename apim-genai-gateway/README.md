# Overview of the Basic AI Chat Agent using APIM GenAI Gateway sample

This sample showcases a custom engine agent using [APIM GenAI Gateway](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities) that responds to user questions like an AI assistant. This enables your users to talk with the AI agent in M365 Copilot to find information.


## Get started with the sample

> **Prerequisites**
>
> To run the sample in your local dev machine, you will need:
>
> - [Node.js](https://nodejs.org/), supported versions: 18, 20, 22.
> - [Microsoft 365 Agents Toolkit Visual Studio Code Extension](https://aka.ms/teams-toolkit) latest version or [Microsoft 365 Agents Toolkit CLI](https://aka.ms/teamsfx-toolkit-cli).
> - An Azure account and a subscription, **which you need to make sure your subscription has quota to create cognitive service in the location you selected.**
> - A [Microsoft 365 account for development](https://docs.microsoft.com/microsoftteams/platform/toolkit/accounts).

### In this sample
1. A cognitive service with one gpt-4o model and one text-embedding-ada-002 model will be deployed.
1. An API Management(APIM) service with **GenAI Gateway** features including token limit policy, emit token metric policy, backend load balancer, circuit breaker, semantic caching policy and content safety policy will be deployed and configured.
1. A copilot agent bot will be created, which will connect the APIM service to call the Azure OpenAI API. You can chat with the agent bot in multiple platforms.

### Configuration for deployment
1. In [main.parameters.json](./infra/apim-new-ai-service/main.parameters.json), you can choose your prefered pricing tier of APIM service, AI services, contentSafety service by setting `apimSku`, `aiServicesSku` and `contentSafetySku`.
> - You can use the [pricing calculator](https://azure.microsoft.com/en-us/pricing/calculator/) to calculate and estimate the price of the deployment in your pricing tier.
You can search for `API Management` and `Azure OpenAI Service` to add APIM service and Cognitive service used in this sample to the calculator.

2. In [main.parameters.json](./infra/apim-new-ai-service/main.parameters.json), you can set value of `enableContentSafety` to **false** to disable [content safety check](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview).

### Conversation with bot
1. Select the Teams Toolkit icon on the left in the VS Code toolbar.
1. In the Account section, sign in with your [Microsoft 365 account](https://docs.microsoft.com/microsoftteams/platform/toolkit/accounts) if you haven't already.
1. Press F5 to start debugging which launches your app in Teams using a web browser. Select `Debug in Teams (Edge)` or `Debug in Teams (Chrome)`.
1. When Teams launches in the browser, select the Add button in the dialog to install your app to Teams.
1. You will receive a welcome message from the bot, or send any message to get a response.

**Congratulations**! You are running an application that can now interact with users in Teams:

> For local debugging using Teams Toolkit CLI, you need to do some extra steps described in [Set up your Teams Toolkit CLI for local debugging](https://aka.ms/teamsfx-cli-debugging).

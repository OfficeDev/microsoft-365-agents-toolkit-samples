# Getting Started with Coffee Agent

Originally from our Build 2025 Lab, this sample is built with the [Teams AI Library v2](https://aka.ms/teamsai-v2), and showcases how easy it is to use activity handlers, adaptive cards, and AI to create a fun, interactive bot with just a few building blocks.

This Coffee Agent helps teams coordinate their daily coffee orders by randomly selecting coffee shops and orderers, managing team coffee orders, and maintaining information about available coffee shops and their offerings. It's perfect for teams that want to streamline their coffee coordination process while having fun with their daily caffeine routine.

![Coffee Agent Demo](assets/coffee-agent-thumbnail.png)

## This sample illustrates
- Use Microsoft 365 Agents Toolkit to create an AI-powered Teams bot
- Use Teams AI Library v2 for activity handlers and adaptive cards
- Implement tool calling and function execution in Teams bots
- Create interactive experiences with adaptive cards and AI responses
- Build a collaborative team management bot for daily coordination

## Key Features

- ☕ Randomly select a coffee shop and orderer for the day
- 📋 Manage and display submitted coffee orders for the team
- 🥤 Maintains a list of coffee shops and drinks
- 🕓 Provides a list of opening hours for coffee shops

## Prerequisite to use this sample
- [Node.js](https://nodejs.org/) version 18.x or higher
- A Microsoft 365 tenant in which you have permission to upload Teams apps. You can get a free Microsoft 365 developer tenant by joining the [Microsoft 365 developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program).
- [Microsoft 365 Agents Toolkit for VS Code](https://aka.ms/teams-toolkit) or [Microsoft 365 Agents Toolkit CLI](https://aka.ms/teams-toolkit-cli)
- OpenAI API Key or Azure OpenAI resource

## Minimal path to awesome

### Run the app locally

1. Install dependencies:
    ```bash
    npm install
    ```

2. Copy the sample environment file:
    ```bash
    cp sample.env .env
    ```

3. Update the `.env` file with your configuration:
    - `CLIENT_ID`: Your Microsoft Teams bot ID (will be automatically generated if using Microsoft 365 Agents Toolkit)
    - `CLIENT_SECRET`: Your bot's password (will be automatically generated if using Microsoft 365 Agents Toolkit)
    - Azure OpenAI or OpenAI configurations. See `sample.env` for more details.

4. Open the project in Visual Studio Code
5. Press F5 to start the debug session (Debug Edge)
6. Microsoft 365 Agents Toolkit will handle:
    - Starting the local bot server
    - Tunneling for external access
    - Opening Teams with your bot loaded
7. Upon installation, the bot will automatically send an adaptive card with your team's coffee order for today!

### Deploy the app to Azure
1. Open the project in Visual Studio Code
2. Use Microsoft 365 Agents Toolkit to provision and deploy to Azure
3. Follow the deployment prompts to configure your Azure resources

### Preview the app in Teams
1. Launch remote debugging or use the deployed version
2. Install the app in Microsoft Teams
3. Start interacting with the Coffee Agent in Teams

## Sample Questions

You can ask the agent questions like:

- "What can you do?"
- "Who should order the coffee today?"
- "I want to add a coffee shop. Can we add the Living Room Cafe. It has two drinks, a Matcha Latte (small) and an Oat Lavender Latte (medium)."
- "Send me an updated list of coffee shops."

## Version History

| Date         | Author     | Comments                               |
| ------------ | ---------- | -------------------------------------- |
| Oct 31, 2025  | qinzhouxu   | Onboard sample with Teams AI Library V2 |

## Feedback
We really appreciate your feedback! If you encounter any issue or error, please report issues to us following the [Supporting Guide](https://github.com/OfficeDev/TeamsFx-Samples/blob/dev/SUPPORT.md). Meanwhile you can make [recording](https://aka.ms/teamsfx-record) of your journey with our product, they really make the product better. Thank you!
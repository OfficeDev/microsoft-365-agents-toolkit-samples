# Getting Started with Data Analyst Agent v2

This sample demonstrates how to build an AI-powered data analyst agent using **Teams AI Library SDK v2** that can be integrated into Microsoft Teams. This template is an updated version of the previous Data Analyst Agent built in v1 of the SDK. It leverages the latest capabilities of the Teams AI Library to help users explore and visualize data through natural language conversations and Adaptive Cards charts.

The Data Analyst Agent v2 transforms how teams interact with data by providing a natural language interface for database exploration and visualization. Users can ask questions in plain English and receive both SQL insights and interactive charts, making data analysis accessible to everyone on the team.

![Data Analyst Agent v2 Demo](assets/demo.gif)

## This sample illustrates
- Use Microsoft 365 Agents Toolkit to create an AI-powered data analysis bot
- Implement natural language to SQL query conversion using Teams AI Library v2
- Generate interactive data visualizations using Adaptive Cards
- Build real-time streamed responses for immediate user feedback
- Integrate with databases for live data exploration and analysis
- Create specialized prompt systems for SQL generation and card creation

## Key Features

- 🔍 Query databases using natural language
- 📊 Generate visualizations using [Adaptive Cards](https://adaptivecards.microsoft.com/?topic=welcome) from query results
- 📈 Analyze data patterns and trends
- 💬 Real-time streamed responses in one-on-one chats for immediate feedback

## Prerequisite to use this sample
- [Node.js](https://nodejs.org/) version 20.x or higher
- A Microsoft 365 tenant in which you have permission to upload Teams apps. You can get a free Microsoft 365 developer tenant by joining the [Microsoft 365 developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program).
- [Microsoft 365 Agents Toolkit for VS Code](https://aka.ms/teams-toolkit) or [Microsoft 365 Agents Toolkit CLI](https://aka.ms/teams-toolkit-cli)
- OpenAI API Key or Azure OpenAI resource

## Minimal path to awesome

### Run the app locally

1. Install dependencies:
    ```bash
    npm install
    ```

3. Copy the sample environment file:
    ```bash
    cp sample.env .env
    ```

4. Update the `.env` file with your configuration:
    - `BOT_ID`: Your Microsoft Teams bot ID (will be automatically generated if using Microsoft 365 Agents Toolkit)
    - `BOT_PASSWORD`: Your bot's password (will be automatically generated if using Microsoft 365 Agents Toolkit)
    - Azure OpenAI or OpenAI configurations. See `sample.env` for more details.

5. Open the project in Visual Studio Code
6. Press F5 to start the debug session (Debug Edge)
7. Microsoft 365 Agents Toolkit will handle:
    - Starting the local bot server
    - Tunneling for external access
    - Opening Teams with your bot loaded

### Deploy the app to Azure

1. Create an empty `.env.dev` file and place it in the `env` folder.
2. Create a `.env.dev.user` file in the `env` folder and add the following contents to it:

```
SECRET_AZURE_OPENAI_API_KEY=<api key>
SECRET_AZURE_OPENAI_API_BASE=<api base> // Example: https://<id>-eastus2.openai.azure.com/
SECRET_AZURE_OPENAI_API_VERSION=<api version> // Example: 2024-08-01-preview
```

3. Navigate over to the Microsoft 365 Agents Toolkit Extension in VSCode, and login to your Azure & M365 credentials.
4. Then select "Provision" under the "Lifecycle" tab. Follow the instructions to select a resource group, and then click "Provision".
5. Once the resources have been provisioned successfully, select "Deploy". It can take 5-10 minutes to deploy your app.
6. Once the app has been deployed successfully, sideload `appPackage.dev.zip` file into Teams following the instructions [here](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/apps-upload).

### Preview the app in Teams
1. Launch remote debugging or use the deployed version
2. Install the app in Microsoft Teams
3. Start asking data analysis questions in natural language

## Sample Questions

You can ask the agent questions like:

- "Show me the top-selling products this year"
- "What's the sales trend by territory?"

See the [AdventureWorks README](src/data/README.md) for more details.

## Advanced usage of this sample

### Dataset

This agent uses the AdventureWorks sample database, a Microsoft-provided dataset that simulates a bicycle manufacturer's data. The database includes:

#### Core Business Areas

- **Sales**: Orders, customers, territories
- **Production**: Products, inventory, work orders
- **Purchasing**: Vendors, purchase orders
- **HR**: Employees, departments
- **Person**: Contact information

**Core Components**

- **Data Analyst Agent**: Main orchestrator that handles user requests. Coordinates between SQL generation and card creation components to provide comprehensive data analysis responses.
- **SQL Prompt**: Specialized prompt system that converts natural language queries into accurate SQL statements for database operations.
- **Card Generation Prompt**: Dedicated prompt system that transforms query results into interactive Adaptive Cards visualizations for Teams.

### Running Evals

This project includes evaluation scripts to test the agent's ability to generate SQL queries and Adaptive Card visualizations.

#### SQL Generation Evaluation

To evaluate the agent's SQL query generation capabilities:

```bash
# Run all SQL test cases
npm run eval:sql

# Run a single test case (useful for debugging)
npm run eval:sql:one
```

The evaluation will:
1. Load test cases from `evals/sql-eval.jsonl`
2. Generate SQL queries for each test case
3. Compare the generated queries against expected results
4. Output results to both console and a log file in `evals/logs/sql-eval-[timestamp].log`

#### Adaptive Card Generation Evaluation

To evaluate the agent's Adaptive Card visualization capabilities:

```bash
# Run all Adaptive Card test cases
npm run eval:ac

# Run a single test case (useful for debugging)
npm run eval:ac:one
```

The evaluation will:
1. Load test cases from `evals/ac-eval.jsonl`
2. Generate Adaptive Cards for each test case
3. Compare the generated cards against expected results
4. Output results to both console and a log file in `evals/logs/ac-eval-[timestamp].log`

Both evaluations will provide detailed feedback including:
- Success rate
- Individual test case results
- Expected vs actual outputs
- Judge's reasoning for each evaluation

## Version History

| Date         | Author     | Comments                               |
| ------------ | ---------- | -------------------------------------- |
| Oct 31, 2025  | qinzhouxu   | Onboard sample with Teams AI Library V2 |

## Feedback
We really appreciate your feedback! If you encounter any issue or error, please report issues to us following the [Supporting Guide](https://github.com/OfficeDev/TeamsFx-Samples/blob/dev/SUPPORT.md). Meanwhile you can make [recording](https://aka.ms/teamsfx-record) of your journey with our product, they really make the product better. Thank you!
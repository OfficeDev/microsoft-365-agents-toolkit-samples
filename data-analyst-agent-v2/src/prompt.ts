import { ChatPrompt } from '@microsoft/teams.ai';
import { OpenAIChatModel } from '@microsoft/teams.openai';
import fs from 'fs';
import { pathToSrc } from './utils';
import { chartCreationSchema, executeSqlSchema } from './schema';
import Database from 'better-sqlite3';
import { generateChartCard } from './cards';
import { Message } from '@microsoft/teams.ai';
import { Attachment } from '@microsoft/teams.api';

const schemaPath = pathToSrc('data/schema.sql');
const dbSchema = fs.readFileSync(schemaPath, 'utf-8');

const examplesPath = pathToSrc('data/data-analyst-examples.jsonl');
const examples = JSON.parse(fs.readFileSync(examplesPath, 'utf-8'));

const systemMessage = `You are an expert data analyst that helps users understand data from the AdventureWorks database.
Your goal is to provide clear, visual insights by querying data and creating appropriate visualizations.

You are only capable of producing horizontal bar charts, vertical bar charts, line charts, and pie charts.

For any SQL queries you need to perform, call on the sqlPrompt to generate and execute a SQL query using the execute_sql function.
Every single time the user wants a graph or chart or table, you MUST call on the cardPrompt to generate the card using the generate_card function.
Never return a raw JSON response to the user. Always return an Adaptive Card with a chart or table if you are prompted for a graph.
Look at the examples below to see how to format your input for the cardPrompt.

Database Schema:
\`\`\`sql
${dbSchema}
\`\`\`

Examples:
${examples.map((ex: any) =>
  `---
User: ${ex.user_message}
Assistant: ${JSON.stringify(ex.data_analyst_response, null, 2)}`
).join('\n')}

For your final response to the user, return a single Adaptive Card with a chart or table, or multiple cards if needed. If you need to return multiple cards, ensure they are all wrapped in a single Adaptive Card response.
Also provide a text response that summarizes the insights or findings from the data. Keep it brief and do not repeat the chart data.
You can also return a simple text response chart is needed.`;

export const createDataAnalystPrompt = (conversationHistory: Message[] = []) => {
  const conversationAttachments: Attachment[] = [];

  const sqlPromptInstance = new ChatPrompt({
    instructions: `You are an expert SQL executor. When called on, generate a SQL query given the context that is given by the main prompt and then execute the query using execute_sql function.
To query the database, use the execute_sql function with a SELECT query.
Only SELECT queries are allowed. No mutations.
Database Schema:
\`\`\`sql
${dbSchema}
\`\`\`

Examples:
${examples.map((ex: any) =>
      `---
User: ${ex.user_message}
Assistant: ${JSON.stringify(ex.data_analyst_response, null, 2)}`
    ).join('\n')}`,
    model: new OpenAIChatModel({
      model: process.env.AOAI_MODEL!,
      apiKey: process.env.AOAI_API_KEY!,
      endpoint: process.env.AOAI_ENDPOINT!,
      apiVersion: '2025-04-01-preview'
    })
  }).function(
    'execute_sql',
    'Executes a SQL SELECT query and returns results',
    executeSqlSchema,
    async ({ query }) => {
      if (!query.trim().toLowerCase().startsWith('select')) {
        return 'Error: Only SELECT queries are allowed';
      }

      const forbidden = ['insert', 'update', 'delete', 'drop', 'alter', 'create'];
      if (forbidden.some(word => query.toLowerCase().includes(word))) {
        return 'Error: Query contains forbidden operations';
      }

      try {
        const dbPath = pathToSrc('data/adventureworks.db');
        const db = new Database(dbPath, { readonly: true });
        const rows = db.prepare(query).all();
        db.close();
        if (!rows.length) {
          return 'No results found for your query.';
        }

        return { rows };
      } catch (err) {
        return `Error executing query: ${err instanceof Error ? err.message : 'Unknown error'}`;
      }
    }
  );

  const cardPromptInstance = new ChatPrompt({
    instructions: 'You generate adaptive cards and charts from provided data. Use the generate_card function to create visualizations.',
    model: new OpenAIChatModel({
      model: process.env.AOAI_MODEL!,
      apiKey: process.env.AOAI_API_KEY!,
      endpoint: process.env.AOAI_ENDPOINT!,
      apiVersion: '2025-04-01-preview'
    })
  }).function(
    'generate_card',
    'Generates a card or chart from data',
    chartCreationSchema,
    async ({ chartType, rows, options }) => {
      conversationAttachments.push(generateChartCard(chartType, rows, options));
    }
  );

  const mainPrompt = new ChatPrompt({
    instructions: systemMessage,
    model: new OpenAIChatModel({
      model: process.env.AOAI_MODEL!,
      apiKey: process.env.AOAI_API_KEY!,
      endpoint: process.env.AOAI_ENDPOINT!,
      apiVersion: '2025-04-01-preview'
    }),
    messages: conversationHistory
  }).use('execute_sql', sqlPromptInstance)
    .use('generate_card', cardPromptInstance);

  return {
    prompt: mainPrompt,
    attachments: conversationAttachments
  };
};
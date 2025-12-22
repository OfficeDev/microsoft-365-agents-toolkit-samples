import { ChatPrompt } from '@microsoft/teams.ai';
import { OpenAIChatModel } from '@microsoft/teams.openai';
import { ConsoleLogger } from '@microsoft/teams.common';
import fs from 'fs';
import { pathToSrc } from './utils';
import { chartCreationSchema, executeSqlSchema } from './schema';
import Database from 'better-sqlite3';
import { generateChartCard } from './cards';
import { Message } from '@microsoft/teams.ai';
import { Attachment } from '@microsoft/teams.api';

const logger = new ConsoleLogger('data-analyst', { level: 'info' });

const schemaPath = pathToSrc('data/schema.sql');
const dbSchema = fs.readFileSync(schemaPath, 'utf-8');

const systemMessage = `You are an expert data analyst that helps users understand data from the AdventureWorks database.
Your goal is to provide clear, visual insights by querying data and creating appropriate visualizations.

You are only capable of producing horizontal bar charts, vertical bar charts, line charts, pie charts, and tables.

IMPORTANT RULES:
1. You MUST use the provided tools to respond. Never output raw JSON.
2. When you need data from the database, call the execute_sql tool first.
3. When you need to display a chart or table, call the generate_card tool.
4. After using the tools, provide a brief text summary.

Database Schema:
\`\`\`sql
${dbSchema}
\`\`\`

Chart types available for generate_card:
- verticalBar: For comparing categories
- horizontalBar: For comparing categories with long labels
- line: For trends over time
- pie: For showing proportions
- table: For detailed data display

When calling generate_card, format the data as rows like: [["Label1", value1], ["Label2", value2], ...]
Include options like title, xAxisTitle, yAxisTitle as needed.`;

export const createDataAnalystPrompt = (conversationHistory: Message[] = []) => {
  const conversationAttachments: Attachment[] = [];

  const mainPrompt = new ChatPrompt({
    instructions: systemMessage,
    model: new OpenAIChatModel({
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME!,
      apiKey: process.env.SECRET_AZURE_OPENAI_API_KEY!,
      endpoint: process.env.AZURE_OPENAI_ENDPOINT!,
      apiVersion: '2025-04-01-preview'
    }),
    messages: conversationHistory
  })
  .function(
    'execute_sql',
    'Executes a SQL SELECT query against the AdventureWorks database and returns the results.',
    executeSqlSchema,
    async ({ query }) => {
      logger.info('execute_sql called');
      
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

        logger.info('execute_sql returned' + rows.length + 'rows');
        return { rows };
      } catch (err) {
        logger.error('execute_sql error:', err);
        return `Error executing query: ${err instanceof Error ? err.message : 'Unknown error'}`;
      }
    }
  )
  .function(
    'generate_card',
    'Generates an Adaptive Card with a chart or table visualization from the provided data.',
    chartCreationSchema,
    async ({ chartType, rows, options }) => {
      logger.info('generate_card called with chartType:' + chartType);
      conversationAttachments.push(generateChartCard(chartType, rows, options));
      return 'Card generated successfully';
    }
  );

  return {
    prompt: mainPrompt,
    attachments: conversationAttachments
  };
};
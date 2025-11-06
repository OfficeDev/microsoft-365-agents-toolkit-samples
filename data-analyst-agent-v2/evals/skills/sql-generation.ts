import { SQLJudge } from '../judge/sql';
import { AgentEvaluator } from './base-evaluator';

new AgentEvaluator({
    evalName: 'sql-eval',
    fileName: 'sql-eval.jsonl',
    autoFunctionCalling: false,
    judge: SQLJudge,
    generatePrompt: (tc) => `Here's the user query: ${tc.user_query}. Let the SQL Prompt generate a SQL query based on the user's input and execute it.`,
    extractGenerated: (_, response) =>
        response.function_calls?.[0].arguments.text || 'MISSING_SQL_OUTPUT',
    extractExpected: (tc) => tc.sql_query,
    extractInput: (tc) => tc.user_query,
}).run(process.argv.includes('--run-one'));
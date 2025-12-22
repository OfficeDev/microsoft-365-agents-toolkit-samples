import { SQLJudge } from '../judge/sql';
import { AgentEvaluator } from './base-evaluator';

new AgentEvaluator({
    evalName: 'sql-eval',
    fileName: 'sql-eval.jsonl',
    autoFunctionCalling: false,
    judge: SQLJudge,
    generatePrompt: (tc) => `Here's the user query: ${tc.user_query}. Generate a SQL query to answer this question.`,
    extractGenerated: (_, response) => {
        // When autoFunctionCalling is false, the model returns function call as JSON in content
        const content = response.content || '';
        // Try to extract JSON from content
        const jsonMatch = content.match(/\{"name":\s*"functions\.execute_sql".*?"query"\s*:\s*"([^"]+(?:\\.[^"]*)*)".*?\}/s);
        if (jsonMatch) {
            // Unescape the query string
            return jsonMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
        }
        // Fallback: try to parse as function_calls array
        return response.function_calls?.[0]?.arguments?.query || 'MISSING_SQL_OUTPUT';
    },
    extractExpected: (tc) => tc.sql_query,
    extractInput: (tc) => tc.user_query,
}).run(process.argv.includes('--run-one'));
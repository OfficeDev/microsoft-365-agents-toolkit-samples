import { ChatPrompt } from '@microsoft/teams.ai';
import { OpenAIChatModel } from '@microsoft/teams.openai';

interface SQLJudgeInput {
    input: string; // The question
    ideal: string; // Expert answer
    completion: string; // Submitted answer
}

interface SQLJudgeResult {
    result: boolean;
    score: number;
    reasoning: string;
}

export const SQLJudge = () => {
    const systemMessage = `You are comparing a submitted answer to an expert answer on a given SQL coding question.
Compare the content and correctness of the submitted SQL with the expert answer.
Ignore any differences in whitespace, style, or output column names.

You MUST call the evaluateSQL to log your results for every request!

Guidelines:
- Two SQL queries that return the same data are considered semantically equivalent,
  even if one includes an ORDER BY clause and the other does not. This means small differences in logic can still be considered correct.
- Only consider ORDER BY differences as meaningful when the user query explicitly
  requires or asks for results in a specific order
- If there is ambiguity in the user query, use best judgement to determine the correct answer

The submitted answer may either be correct or incorrect. Determine which case applies.`;

    const prompt = new ChatPrompt({
        instructions: systemMessage,
        model: new OpenAIChatModel({
            model: process.env.AOAI_MODEL!,
            apiKey: process.env.AOAI_API_KEY!,
            endpoint: process.env.AOAI_ENDPOINT!,
            apiVersion: '2025-04-01-preview',
        }),
    }).function(
        'evaluateSQL',
        'Determine correctness of SQL query compared to expert answer',
        {
            type: 'object',
            properties: {
                result: {
                    type: 'boolean',
                    description: 'correctness of the submitted SQL compared to expert SQL'
                },
                reasoning: {
                    type: 'string',
                    description: 'reasoning for result'
                }
            },
            required: ['result', 'reasoning'],
        },
        async ({ result, reasoning }: { result: Boolean, reasoning: String }) => {
            return {
                result,
                reasoning
            }
        }
    );
    return {
        evaluate: async ({ input, ideal, completion }: SQLJudgeInput): Promise<SQLJudgeResult> => {
            const userPrompt = `[BEGIN DATA]
************
[Question]: ${input}
************
[Expert]: ${ideal}
************
[Submission]: ${completion}
************
[END DATA]`;
            const res = await prompt.send(userPrompt, { autoFunctionCalling: false });
            const functionCallArgs = res.function_calls?.[0]?.arguments;

            return {
                result: functionCallArgs?.result || false,
                score: functionCallArgs?.result ? 1.0 : 0.0,
                reasoning: functionCallArgs?.reasoning || 'There was a problem during evaluation.'
            };
        },
    };
};

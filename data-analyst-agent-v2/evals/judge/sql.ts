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
            model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME!,
            apiKey: process.env.AZURE_OPENAI_API_KEY!,
            endpoint: process.env.AZURE_OPENAI_ENDPOINT!,
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
            
            // Parse function call from content (model returns JSON in content when autoFunctionCalling is false)
            let functionCallArgs: { result?: boolean; reasoning?: string } | undefined;
            
            if (res.function_calls?.[0]?.arguments) {
                functionCallArgs = res.function_calls[0].arguments;
            } else if (res.content) {
                // Try to parse JSON from content
                try {
                    const content = res.content;

                    // First, try to extract a JSON object and parse it directly
                    const objectMatch = content.match(/\{[\s\S]*\}/);
                    if (objectMatch) {
                        const parsed = JSON.parse(objectMatch[0]);
                        if (typeof parsed.result === 'boolean' && typeof parsed.reasoning === 'string') {
                            functionCallArgs = {
                                result: parsed.result,
                                reasoning: parsed.reasoning
                            };
                        }
                    }

                    // Fallback: use a simpler regex extraction if JSON.parse did not yield result
                    if (!functionCallArgs) {
                        const fallbackMatch = content.match(
                            /"result"\s*:\s*(true|false)[\s\S]*?"reasoning"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/
                        );
                        if (fallbackMatch) {
                            functionCallArgs = {
                                result: fallbackMatch[1] === 'true',
                                reasoning: fallbackMatch[2].replace(/\\"/g, '"').replace(/\\n/g, '\n')
                            };
                        }
                    }
                } catch (e) {
                    // Parsing failed, will use fallback
                }
            }

            return {
                result: functionCallArgs?.result || false,
                score: functionCallArgs?.result ? 1.0 : 0.0,
                reasoning: functionCallArgs?.reasoning || 'There was a problem during evaluation.'
            };
        },
    };
};

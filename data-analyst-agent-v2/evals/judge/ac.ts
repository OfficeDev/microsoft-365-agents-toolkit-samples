import { ChatPrompt } from '@microsoft/teams.ai';
import { OpenAIChatModel } from '@microsoft/teams.openai';

interface ACJudgeInput {
    input: string;
    ideal: string; 
    completion: string; 
}

interface ACJudgeResult {
    result: boolean;
    score: number;
    reasoning: string;
}

export const ACJudge = () => {
    const systemMessage = `You are comparing a submitted Adaptive Card to an expert answer for data visualization.
Compare the content and correctness of the submitted card with the expert answer. 

You MUST call the evaluateAdaptiveCard to log your results for every request!

Focus primarily on these critical aspects:
1. Correct visualization type for the data (e.g. vertical bar, horizontal bar, pie chart)
2. Data is properly mapped and visualized

Discrepancies involving this should NOT be considered incorrect:
- Titles, labels and text content
- Spacing or formatting
- Property ordering
- Additional optional properties
- Axis titles or legends

Special Instructions:
- Color values do not have to be the same as input colors.
- Color values have to be one of the following:
  * CATEGORICALRED, CATEGORICALPURPLE, CATEGORICALLAVENDER,
    CATEGORICALBLUE, CATEGORICALLIGHTBLUE, CATEGORICALTEAL,
    CATEGORICALGREEN, CATEGORICALLIME, CATEGORICALMARIGOLD
  * SEQUENTIAL1 through SEQUENTIAL8
  * DIVERGINGBLUE, DIVERGINGLIGHTBLUE, DIVERGINGCYAN,
    DIVERGINGTEAL, DIVERGINGYELLOW, DIVERGINGPEACH,
    DIVERGINGLIGHTRED, DIVERGINGRED, DIVERGINGMAROON,
    DIVERGINGGRAY

As long as the correct chart type is used and the data is properly visualized,
consider the submission correct even if titles, labels, colors, or other properties differ from the expert answer.`;

    const prompt = new ChatPrompt({
        instructions: systemMessage,
        model: new OpenAIChatModel({
            model: process.env.AOAI_MODEL!,
            apiKey: process.env.AOAI_API_KEY!,
            endpoint: process.env.AOAI_ENDPOINT!,
            apiVersion: '2025-04-01-preview',
        }),
    }).function(
        'evaluateAdaptiveCard',
        'Determine correctness of adaptive card input',
        {
            type: 'object',
            properties: {
                result: {
                    type: 'boolean',
                    description: 'correctness of the adaptive card input compared to ideal card'
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
        evaluate: async ({ input, ideal, completion }: ACJudgeInput): Promise<ACJudgeResult> => {
            const userPrompt = `[BEGIN DATA]
************
[Data to Visualize]: ${input}
************
[Expert Card]: ${ideal}
************
[Submission]: ${completion}
************
[END DATA]`;
            const res = await prompt.send(userPrompt, { autoFunctionCalling: false });
            const functionCallArgs = res.function_calls?.[0].arguments;

            return {
                result: functionCallArgs?.result || false,
                score: functionCallArgs?.result ? 1.0 : 0.0,
                reasoning: functionCallArgs?.reasoning || 'There was a problem during evaluation.'
            }
        },
    };
};

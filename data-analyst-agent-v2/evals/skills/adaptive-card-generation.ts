import { ACJudge } from '../judge/ac';
import { AgentEvaluator } from './base-evaluator';

new AgentEvaluator({
    evalName: 'ac-eval',
    fileName: 'ac-eval.jsonl',
    autoFunctionCalling: true,
    judge: ACJudge,
    generatePrompt: (tc) =>
        `Create an appropriate visualization for this data: ${JSON.stringify(tc.input_data)}. Please return a single card.\nUse the following type of visualization: ${tc.visualization_type}.`,
    extractGenerated: (agent) => JSON.stringify(agent.attachments?.[0] ?? {}),
    extractExpected: (tc) => JSON.stringify(tc.expected_card),
    extractInput: (tc) => JSON.stringify(tc.input_data),
}).run(process.argv.includes('--run-one'));
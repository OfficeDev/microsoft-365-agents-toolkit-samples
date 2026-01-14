import { ACJudge } from '../judge/ac';
import { AgentEvaluator } from './base-evaluator';
import { generateChartCard } from '../../src/cards';

new AgentEvaluator({
    evalName: 'ac-eval',
    fileName: 'ac-eval.jsonl',
    autoFunctionCalling: true,
    judge: ACJudge,
    generatePrompt: (tc) =>
        `Create an appropriate visualization for this data: ${JSON.stringify(tc.input_data)}. Please return a single card.\nUse the following type of visualization: ${tc.visualization_type}.`,
    extractGenerated: (agent, response) => {
        // First check if there are actual attachments from function execution
        if (agent.attachments?.length > 0) {
            const attachment = agent.attachments[0];
            return JSON.stringify(attachment.content);
        }
        
        // When model returns JSON in content instead of calling functions
        const content = response.content || '';
        
        try {
            // Try format 1: {"name":"functions.generate_card","arguments":{...}}
            let startIdx = content.indexOf('{"name":"functions.generate_card"');
            if (startIdx !== -1) {
                let braceCount = 0;
                let endIdx = startIdx;
                for (let i = startIdx; i < content.length; i++) {
                    if (content[i] === '{') braceCount++;
                    else if (content[i] === '}') braceCount--;
                    if (braceCount === 0) {
                        endIdx = i + 1;
                        break;
                    }
                }
                const jsonStr = content.substring(startIdx, endIdx);
                const functionCall = JSON.parse(jsonStr);
                const { chartType, rows, options } = functionCall.arguments;
                if (chartType && rows) {
                    const attachment = generateChartCard(chartType, rows, options);
                    return JSON.stringify(attachment.content);
                }
            }
            
            // Try format 2: Direct {"chartType":"...","rows":[...],...} at start of content
            startIdx = content.indexOf('{"chartType"');
            if (startIdx !== -1) {
                let braceCount = 0;
                let endIdx = startIdx;
                for (let i = startIdx; i < content.length; i++) {
                    if (content[i] === '{') braceCount++;
                    else if (content[i] === '}') braceCount--;
                    if (braceCount === 0) {
                        endIdx = i + 1;
                        break;
                    }
                }
                const jsonStr = content.substring(startIdx, endIdx);
                const { chartType, rows, options } = JSON.parse(jsonStr);
                if (chartType && rows) {
                    const attachment = generateChartCard(chartType, rows, options);
                    return JSON.stringify(attachment.content);
                }
            }
        } catch (e) {
            // Silent fail
        }
        
        return '{}';
    },
    extractExpected: (tc) => JSON.stringify(tc.expected_card),
    extractInput: (tc) => JSON.stringify(tc.input_data),
}).run(process.argv.includes('--run-one'));
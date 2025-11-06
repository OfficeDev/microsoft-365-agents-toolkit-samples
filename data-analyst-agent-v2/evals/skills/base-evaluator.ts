import { ConsoleLogger } from '@microsoft/teams.common';
import * as fs from 'fs';
import * as path from 'path';
import { createDataAnalystPrompt } from '../../src/prompt';

interface EvalCase {
    task: string;
    [key: string]: any;
}

interface EvalResult {
    task: string;
    success: boolean;
    judge_result: {
        result: boolean;
        score: number;
        reasoning: string;
    };
    [key: string]: any;
}

type Judge = {
    evaluate(args: { input: string; ideal: string; completion: string }): Promise<{
        result: boolean;
        score: number;
        reasoning: string;
    }>;
};

interface EvaluationConfig {
    evalName: string;
    fileName: string;
    autoFunctionCalling: boolean,
    judge: () => Judge;
    generatePrompt: (testCase: EvalCase) => string;
    extractGenerated: (agent: any, response: any) => string;
    extractExpected: (testCase: EvalCase) => string;
    extractInput: (testCase: EvalCase) => string;
}

export class AgentEvaluator {
    constructor(private config: EvaluationConfig) {}

    async run(runOne = false) {
        const log = new ConsoleLogger(this.config.evalName, { level: 'info' });

        const evalFilePath = path.join(__dirname, '..', this.config.fileName);
        const evalContent = fs.readFileSync(evalFilePath, 'utf-8');
        const evalCases: EvalCase[] = JSON.parse(evalContent);

        const casesToRun = runOne ? evalCases.slice(1, 2) : evalCases;
        const results: EvalResult[] = [];

        for (const testCase of casesToRun) {
            log.info(`Evaluating: ${testCase.task}`);
            const judge = this.config.judge();
            const dataAnalyst = createDataAnalystPrompt();

            try {
                const prompt = this.config.generatePrompt(testCase);
                const response = await dataAnalyst.prompt.send(prompt, {autoFunctionCalling: this.config.autoFunctionCalling});
                const generated = this.config.extractGenerated(dataAnalyst, response);

                const judgeResult = await judge.evaluate({
                    input: this.config.extractInput(testCase),
                    ideal: this.config.extractExpected(testCase),
                    completion: generated,
                });

                results.push({
                    task: testCase.task,
                    success: judgeResult.result,
                    judge_result: judgeResult,
                    expected: this.config.extractExpected(testCase),
                    actual: generated,
                    input: this.config.extractInput(testCase),
                });
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Unknown error';
                results.push({
                    task: testCase.task,
                    success: false,
                    judge_result: {
                        result: false,
                        score: 0,
                        reasoning: message,
                    },
                    error: message,
                });
            }
        }

        this.outputResults(results);
    }

    private outputResults(results: EvalResult[]) {
        const total = results.length;
        const passed = results.filter(r => r.success).length;

        let output = '';
        results.forEach((res, i) => {
            output += `\n--- Test Case ${i + 1}: ${res.task} ---\n`;
            output += `✅ Success: ${res.success}\n`;
            output += `Input: ${res.input}\n`;
            output += `Expected:\n${res.expected}\n`;
            output += `Actual:\n${res.actual ?? 'N/A'}\n`;
            output += `Score: ${res.judge_result.score}\n`;
            output += `Reason: ${res.judge_result.reasoning}\n`;
            if (res.error) output += `Error: ${res.error}\n`;
        });

        output += `\n=== ${this.config.evalName} Summary ===\n`;
        output += `Total: ${total}, Passed: ${passed}, Failed: ${total - passed}, Success Rate: ${(100 * passed / total).toFixed(2)}%\n`;

        console.log(output);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
        const logFile = path.join(logDir, `${this.config.evalName}-${timestamp}.log`);
        fs.writeFileSync(logFile, output);
    }
}

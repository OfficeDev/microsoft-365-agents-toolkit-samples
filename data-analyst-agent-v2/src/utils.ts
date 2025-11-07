import { Attachment } from '@microsoft/teams.api';
import fs from 'fs';
import path from 'path';

export function pathToSrc(relativePath: string): string {
    return path.join(__dirname, relativePath);
}

export function loadSchema(): string {
    return fs.readFileSync(path.join(__dirname, 'data', 'schema.sql'), 'utf-8');
}

export function loadExamples(): any[] {
    const examplesPath = path.join(__dirname, 'data', 'data-analyst-examples.jsonl');
    const examplesContent = fs.readFileSync(examplesPath, 'utf-8');
    return examplesContent.split('\n').map(line => JSON.parse(line));
}

export function getDatabasePath(): string {
    return path.join(__dirname, 'data', 'adventureworks.db');
}

export const shared = {
    attachments: [] as Attachment[]
};

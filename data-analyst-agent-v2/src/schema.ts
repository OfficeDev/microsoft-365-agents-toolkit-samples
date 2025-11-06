import { ObjectSchema } from '@microsoft/teams.ai';

export const executeSqlSchema: ObjectSchema = {
    type: 'object',
    properties: {
        query: {
            type: 'string',
            description: 'SQL query to execute'
        }
    },
    required: ['query']
};

// Sub-schema of full Adaptive Card schema to create cards with simple charts
export const chartCreationSchema: ObjectSchema = {
    type: 'object',
    properties: {
        chartType: {
            type: 'string',
            enum: ['verticalBar', 'horizontalBar', 'line', 'pie', 'table'],
            description: 'Type of chart to render, if applicable.'
        },
        rows: {
            type: 'array',
            items: {
                type: 'array',
                items: {}
            },
            description: 'Data rows for chart/table.'
        },
        options: {
            type: 'object',
            description: 'Chart/table options such as title, axis labels, etc.',
            properties: {
                title: { type: 'string' },
                xAxisTitle: { type: 'string' },
                yAxisTitle: { type: 'string' }
            },
        }
    }
}
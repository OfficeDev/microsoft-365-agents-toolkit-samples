import { ObjectSchema } from '@microsoft/teams.ai';

/**
 * Schema to add a new coffee shop, used by the function.
 */
const addCoffeeShopSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            description: 'The name of the coffee shop.',
        },
        drinks: {
            type: 'array',
            description: 'The list of drinks available at the coffee shop.',
            items: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'The name of the drink.',
                    },
                    size: {
                        type: 'string',
                        description: 'The size of the drink.',
                    },
                },
                required: ['name', 'size'],
            },
        },
    },
    required: ['name', 'drinks'],
} as ObjectSchema;

export { addCoffeeShopSchema };

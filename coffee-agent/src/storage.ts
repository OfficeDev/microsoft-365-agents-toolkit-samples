import { Member, Drink, CoffeeOrder } from './interfaces';

const initialCafes = [
    {
        name: 'Starbucks',
        drinks: [
            { name: 'Vanilla Latte', size: 'medium' },
            { name: 'Espresso', size: 'small' },
        ],
    },
    {
        name: "Dunkin'",
        drinks: [
            { name: 'Cold Brew', size: 'large' },
            { name: 'Iced Coffee', size: 'medium' },
        ],
    },
    {
        name: "Peet's Coffee",
        drinks: [
            { name: 'Decaf', size: 'large' },
            { name: 'Mocha', size: 'medium' },
        ],
    },
];

const selectedCafe = initialCafes[Math.floor(Math.random() * initialCafes.length)];
const drinksAvailable = selectedCafe.drinks;
const memberOne = { name: 'Corina' } as Member;
const memberTwo = { name: 'Lily' } as Member;

const initialOrder = {
    id: 1,
    date: new Date(),
    drinks: new Map<Member, Drink>([
        [memberOne, drinksAvailable[0] as Drink],
        [memberTwo, drinksAvailable[1] as Drink],
    ]),
    coffeeShop: selectedCafe,
    status: 'pending',
} as CoffeeOrder;

export { initialCafes, initialOrder };

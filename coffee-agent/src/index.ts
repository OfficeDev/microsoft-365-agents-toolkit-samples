import { App } from '@microsoft/teams.apps';
import { ChatPrompt } from '@microsoft/teams.ai';
import { AzureOpenAIChatModelOptions, OpenAIChatModel } from '@microsoft/teams.openai';
import { ConsoleLogger, LocalStorage } from '@microsoft/teams.common';
import { DevtoolsPlugin } from '@microsoft/teams.dev';
import { InvokeResponse, TaskModuleResponse } from '@microsoft/teams.api';
import { CoffeeShop, Member, StorageState } from './interfaces';
import { generateOrderCard, generateOrderDialogCard, generateSubmittedOrderCard } from './cards';
import { addCoffeeShopSchema } from './schema';
import { initialCafes, initialOrder } from './storage';

const storage = new LocalStorage<StorageState>();
storage.set('local', { coffeeShops: initialCafes, currOrder: initialOrder } as StorageState);

const app = new App({
    logger: new ConsoleLogger('@samples/coffee', { level: 'debug' }),
    plugins: [new DevtoolsPlugin()],
});

app.on('install.add', async ({ send }) => {
    await send(
        "Yawwn... Oh, hi there 👋, I'm your team's designated Coffee Bot! Let's start brewing... I have randomly selected the cafe for today!",
    );
    const card = generateOrderCard(initialOrder);
    await send(card);
});

app.on('dialog.open', async () => {
    const order = storage.get('local')!.currOrder;
    const dialogCard = generateOrderDialogCard(order!);

    return {
        task: {
            type: 'continue',
            value: {
                card: {
                    contentType: 'application/vnd.microsoft.card.adaptive',
                    content: dialogCard,
                },
                height: 'medium',
                title: 'Submit Your Order',
            },
        },
    } as TaskModuleResponse;
});

app.on('dialog.submit', async ({ activity, send }) => {
    const data = activity.value!.data;
    const userName = data.userNameInput;
    const selectedDrinkInput = data.selectedDrinkInput;
    const state = storage.get('local');
    const order = state!.currOrder;
    const selectedDrink = order?.coffeeShop.drinks.find(d => `${d.name} (${d.size})` === selectedDrinkInput);
    const member: Member = { name: userName };

    if (order && selectedDrink) {
        order.drinks.set(member, selectedDrink);
        storage.set('local', state!);
    }

    const updatedCard = generateSubmittedOrderCard(order!);
    await send(updatedCard);

    return {
        status: 200,
        body: {
            task: {
                type: 'message',
                value: 'Thanks for submitting your coffee order! It is coming right up!',
            },
        },
    } as InvokeResponse<'task/submit'>;
});

app.on('message', async ({ send, activity }) => {
    await send({ type: 'typing' });
    const res = await prompt.send(activity.text);
    await send(res.content!);
});

const prompt = new ChatPrompt(
    {
        instructions: [
            'you are an assistant that helps manage daily coffee orders for the team.',
            'every day, you will randomly select a team member to place an order for coffee.',
        ].join('\n'),
        model: new OpenAIChatModel({
            model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
            apiKey: process.env.SECRET_AZURE_OPENAI_API_KEY,
            endpoint: process.env.AZURE_OPENAI_ENDPOINT,
            apiVersion: '2025-04-01-preview',
        } as AzureOpenAIChatModelOptions),
    },
)
    .function('choose_orderer', 'chooses the person assigned to get the coffee', () => {
        const state = storage.get('local');
        const order = state!.currOrder;
        const members = order!.drinks.keys();
        const membersArray = Array.from(members!);
        const selectedOrderer = membersArray[Math.floor(Math.random() * membersArray.length)];
        state!.currOrder!.orderer = selectedOrderer;
        storage.set('local', state!);
        return selectedOrderer;
    })
    .function(
        'add_coffee_shop',
        'adds a new coffee shop to the list of coffee shops',
        addCoffeeShopSchema,
        (cafe: CoffeeShop) => {
            const state = storage.get('local');
            state!.coffeeShops.push(cafe);
            storage.set('local', state!);
            return cafe;
        },
    )
    .function('get_coffee_shops', 'returns the list of available coffee shops', () => {
        const state = storage.get('local');
        return state?.coffeeShops;
    });

(async () => {
    await app.start(+(process.env.PORT || 3978));
})();

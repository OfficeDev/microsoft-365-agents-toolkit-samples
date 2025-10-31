import { App } from '@microsoft/teams.apps';
import { ConsoleLogger } from '@microsoft/teams.common';
import { DevtoolsPlugin } from '@microsoft/teams.dev';
import { createDataAnalystPrompt } from './prompt';
import { MessageActivity } from '@microsoft/teams.api';
import { Message } from '@microsoft/teams.ai';

const conversationHistoryById = new Map<string, Message[]>();

const app = new App({
    logger: new ConsoleLogger('adventureworks-data-analyst', { level: 'debug' }),
    plugins: [new DevtoolsPlugin()],
});

app.on('install.add', async ({ send }) => {
    await send(
        "👋 Hi! I'm your Data Analyst Agent. Ask me about your data and I'll help you explore it with SQL and visualizations!"
    );
});

app.on('message', async ({ send, activity, stream }) => {
    await send({ type: 'typing' });

    const conversationId = activity.conversation.id;

    let conversationHistory = conversationHistoryById.get(conversationId);
    if (!conversationHistory) {
        conversationHistory = [];
        conversationHistoryById.set(conversationId, conversationHistory);
    }

    const { prompt, attachments } = createDataAnalystPrompt(conversationHistory);

    // Only stream chunked response if in one-on-one chat, otherwise get full response back before sending
    const res = activity.conversation.isGroup
        ? await prompt.send(activity.text)
        : await prompt.send(activity.text, {
            onChunk: (chunk) => {
                stream.emit(chunk);
            }
        });

    const resultMessage = new MessageActivity().addAiGenerated();
    if (attachments.length > 0) {
        // Add attachments to result if there are any
        resultMessage.addAttachments(...attachments);
    }

    if (activity.conversation.isGroup) {
        // Send text and attachments as one message in group chats
        if (res.content) resultMessage.addText(res.content);
        await send(resultMessage);
    } else {
        // Stream attachments if in one-on-one chats
        stream.emit(resultMessage);
    }
});

(async () => {
    await app.start(+(process.env.PORT || 3000));
})();
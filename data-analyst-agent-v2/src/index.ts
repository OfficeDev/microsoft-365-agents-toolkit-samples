import { ManagedIdentityCredential } from '@azure/identity';
import { Message } from '@microsoft/teams.ai';
import { MessageActivity, TokenCredentials } from '@microsoft/teams.api';
import { App } from '@microsoft/teams.apps';
import { ConsoleLogger } from '@microsoft/teams.common';
import { createDataAnalystPrompt } from './prompt';

const conversationHistoryById = new Map<string, Message[]>();

const createTokenFactory = () => {
  return async (scope: string | string[], tenantId?: string): Promise<string> => {
    const managedIdentityCredential = new ManagedIdentityCredential({
        clientId: process.env.CLIENT_ID
      });
    const scopes = Array.isArray(scope) ? scope : [scope];
    const tokenResponse = await managedIdentityCredential.getToken(scopes, {
      tenantId: tenantId
    });
   
    return tokenResponse.token;
  };
};

// Configure authentication using TokenCredentials
const tokenCredentials: TokenCredentials = {
  clientId: process.env.CLIENT_ID || '',
  token: createTokenFactory()
};

const credentialOptions = process.env.BOT_TYPE === "UserAssignedMsi" ? { ...tokenCredentials } : undefined;

const app = new App({
    ...credentialOptions,
    logger: new ConsoleLogger('adventureworks-data-analyst', { level: 'debug' })
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
    await app.start(process.env.PORT || process.env.port || 3978);
    console.log(`\nAgent started, app listening to`, process.env.PORT || process.env.port || 3978);
})();

export default app;

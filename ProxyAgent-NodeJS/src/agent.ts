import { ActivityTypes } from "@microsoft/agents-activity";
import { AgentApplication, MemoryStorage, TurnContext, TurnState } from "@microsoft/agents-hosting";
import {  TokenCredential } from "@azure/identity";
import {
  AgentsClient,
  Agent,
  AgentThread,
  MessageDeltaChunk,
  MessageDeltaTextContent
} from "@azure/ai-agents";

import config from "./config";
import { UserAuthorizationTokenWrapper } from "./userAuthTokenWrapper";
import { logger } from "./logger";


// Define custom conversation state to store thread info
interface CustomConversationState {
  threadInfo?: string;
}

// Type alias for TurnState with custom conversation state
type AppTurnState = TurnState<CustomConversationState>;

class ProxyAgent extends AgentApplication<AppTurnState> {
  private agentModelCache = new Map<string, Agent>();

  constructor() {
    // Configuration validation
    if (!config.azureAIFoundryProjectEndpoint) {
      throw new Error("AzureAIFoundryProjectEndpoint is not configured.");
    }
    if (!config.agentId) {
      throw new Error("AgentID is not configured.");
    }
    if (!config.ssoConnectionName) {
      throw new Error("SSO Connection Name is not configured.");
    }

    super({
      storage: new MemoryStorage(),
      authorization: {
        'SSO': {
          name: config.ssoConnectionName,
          title: 'Sign in to the Agent',
          text: 'Please sign in to continue'
        }
      }
    });

    logger.info(`ProxyAgent initialized with SSO Connection: ${config.ssoConnectionName}`);

    this.onMessage("--signout", this._handleSignOut);
    this.onMessage("--clearcache", this._handleClearCache);
    this.onActivity(ActivityTypes.Message, this._handleMessage, ['SSO']);
  }


  private _deserializeThread = (threadData: string): AgentThread | null => {
    try {
      return JSON.parse(threadData);
    } catch (error) {
      logger.debug("Failed to deserialize thread, creating new one");
      return null;
    }
  };

  private _serializeThread = (thread: AgentThread): string => {
    return JSON.stringify(thread);
  };

  private _createAgentsClient = async (context: TurnContext): Promise<AgentsClient> => {
    logger.debug('Creating AgentsClient with SSO authentication');

    let credential: TokenCredential;

    credential = new UserAuthorizationTokenWrapper(
      this.authorization as any,
      context,
      "SSO"
    );

    const client = new AgentsClient(config.azureAIFoundryProjectEndpoint!, credential);
    logger.debug('AgentsClient created successfully');
    return client;
  };

  private _getConversationThread = async (client: AgentsClient, turnState: AppTurnState): Promise<AgentThread> => {
    const agentThreadInfo = turnState?.conversation?.threadInfo;

    if (!agentThreadInfo) {
      logger.debug('Creating new conversation thread');
      const newThread = await client.threads.create();
      logger.debug(`New thread created: ${newThread.id}`);
      return newThread;
    } else {
      const deserializedThread = this._deserializeThread(agentThreadInfo);
      if (deserializedThread) {
        logger.debug(`Using existing thread: ${deserializedThread.id}`);
        return deserializedThread;
      } else {
        logger.debug('Failed to deserialize thread, creating new one');
        const newThread = await client.threads.create();
        logger.debug(`New thread created: ${newThread.id}`);
        return newThread;
      }
    }
  };

  private _handleSignOut = async (context: TurnContext, turnState: AppTurnState): Promise<void> => {
    try {
      await this.authorization.signOut(context, turnState, 'SSO');
      logger.info("User signed out successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error(`Error signing out: ${errorMessage}`);
    }
    await context.sendActivity("You have signed out");
  };

  private _handleClearCache = async (context: TurnContext, _turnState: AppTurnState): Promise<void> => {
    this.agentModelCache.clear();
    await context.sendActivity("The agent model cache has been cleared.");
    logger.info("Agent model cache cleared");
  };

  private _handleMessage = async (context: TurnContext, turnState: AppTurnState): Promise<void> => {
    const userMessage = context.activity.text || "";
    logger.info(`Processing message from user (Activity ID: ${context.activity.id})`);
    logger.debug(`User message: ${userMessage}`);

    try {
      context.streamingResponse.queueInformativeUpdate("Just a moment please...");

      const client = await this._createAgentsClient(context);

      let agentModel = this.agentModelCache.get(config.agentId!);
      if (!agentModel) {
        logger.debug(`Fetching agent from Microsoft Foundry: ${config.agentId}`);
        context.streamingResponse.queueInformativeUpdate("Connecting to Microsoft Foundry...");

        agentModel = await client.getAgent(config.agentId!);
        logger.info(`Connected to agent: ${agentModel.name || agentModel.id}`);
        
        this.agentModelCache.set(config.agentId!, agentModel);
      } else {
        logger.debug(`Using cached agent: ${agentModel.name || agentModel.id}`);
      }

      const agentThread = await this._getConversationThread(client, turnState);

      context.streamingResponse.queueInformativeUpdate("Sending request to Microsoft Foundry Agent...");

      await client.messages.create(agentThread.id, "user", userMessage);
      logger.debug("Message added to thread");

      const runResponse = client.runs.create(agentThread.id, agentModel.id);
      const stream = await runResponse.stream();
      logger.debug("Streaming started");

      let chunkCount = 0;

      try {
        for await (const event of stream) {
          logger.debug(`Stream event: ${event.event}`);

          if (event.event === "thread.message.delta" && event.data) {
            const deltaChunk = event.data as MessageDeltaChunk;

            if (deltaChunk.delta && deltaChunk.delta.content) {
              for (const content of deltaChunk.delta.content) {
                if (content.type === "text") {
                  const textContent = content as MessageDeltaTextContent;
                  if (textContent.text?.value) {
                    const chunkText = textContent.text.value;
                    chunkCount++;
                    context.streamingResponse.queueTextChunk(chunkText);
                  }
                }
              }
            }
          }

          if (event.event === "thread.run.completed") {
            logger.info("Agent response completed successfully");
          }

          if (event.event === "thread.run.failed") {
            logger.error("Agent run failed:", event.data);
          }
        }

        logger.debug(`Streaming complete. Total chunks: ${chunkCount}`);
      } catch (streamError) {
        const errorMessage = streamError instanceof Error ? streamError.message : String(streamError);
        logger.error(`Streaming error: ${errorMessage}`);
        context.streamingResponse.queueTextChunk(`\n\nAn error occurred during streaming: ${errorMessage}`);
      } finally {
        await context.streamingResponse.endStream();
      }

      if (turnState?.conversation) {
        turnState.conversation.threadInfo = this._serializeThread(agentThread);
        logger.debug("Thread saved to conversation state");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      logger.error(`Error processing message: ${errorMessage}`);
      if (errorStack) {
        logger.debug(`Stack trace:\n${errorStack}`);
      }
      try {
        context.streamingResponse.queueTextChunk(`An error occurred while processing your request. ${errorMessage}`);
        await context.streamingResponse.endStream();
      } catch (streamEndError) {
        logger.error("Error ending stream after error:", streamEndError);
      }
    }
  };
}

export const agentApp = new ProxyAgent();

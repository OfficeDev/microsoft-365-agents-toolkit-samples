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

    console.log(`[ProxyAgent Init] SSO Connection Name: ${config.ssoConnectionName}`);

    this.onMessage("--signout", this._handleSignOut);
    this.onMessage("--clearcache", this._handleClearCache);
    this.onActivity(ActivityTypes.Message, this._handleMessage, ['SSO']);
  }


  private _deserializeThread = (threadData: string): AgentThread | null => {
    try {
      return JSON.parse(threadData);
    } catch (error) {
      console.warn("Failed to deserialize thread, creating new one");
      return null;
    }
  };

  private _serializeThread = (thread: AgentThread): string => {
    return JSON.stringify(thread);
  };

  private _createAgentsClient = async (context: TurnContext): Promise<AgentsClient> => {
    console.log('[createAgentsClient] Starting client creation...');
    console.log(`[createAgentsClient] Project endpoint: ${config.azureAIFoundryProjectEndpoint}`);

    let credential: TokenCredential;

    console.log("[createAgentsClient] ✓ Using SSO authentication for Azure AI Foundry");
    console.log(`[createAgentsClient] Activity ID: ${context.activity.id}`);


    credential = new UserAuthorizationTokenWrapper(
      this.authorization as any,
      context,
      "SSO"
    );
    console.log('[createAgentsClient] ✓ UserAuthorizationTokenWrapper created with SSO token');


    console.log('[createAgentsClient] Creating AgentsClient...');
    const client = new AgentsClient(config.azureAIFoundryProjectEndpoint!, credential);
    console.log('[createAgentsClient] ✓ AgentsClient created successfully');
    return client;
  };

  private _getConversationThread = async (client: AgentsClient, turnState: AppTurnState): Promise<AgentThread> => {
    console.log('[getConversationThread] Getting conversation thread...');
    const agentThreadInfo = turnState?.conversation?.threadInfo;

    if (!agentThreadInfo) {
      console.log('[getConversationThread] No existing thread found. Creating new thread...');
      const newThread = await client.threads.create();
      console.log(`[getConversationThread] ✓ New thread created: ${newThread.id}`);
      return newThread;
    } else {
      console.log('[getConversationThread] Existing thread info found. Deserializing...');
      const deserializedThread = this._deserializeThread(agentThreadInfo);
      if (deserializedThread) {
        console.log(`[getConversationThread] ✓ Thread deserialized: ${deserializedThread.id}`);
        return deserializedThread;
      } else {
        console.log('[getConversationThread] Failed to deserialize. Creating new thread...');
        const newThread = await client.threads.create();
        console.log(`[getConversationThread] ✓ New thread created: ${newThread.id}`);
        return newThread;
      }
    }
  };

  private _handleSignOut = async (context: TurnContext, turnState: AppTurnState): Promise<void> => {
    try {
      await this.authorization.signOut(context, turnState, 'SSO');
      console.log("[handleSignOut] ✓ User signed out successfully from aifoundryaccess");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[handleSignOut] Error signing out: ${errorMessage}`);
    }
    await context.sendActivity("You have signed out");
  };

  private _handleClearCache = async (context: TurnContext, _turnState: AppTurnState): Promise<void> => {
    this.agentModelCache.clear();
    await context.sendActivity("The agent model cache has been cleared.");
    console.log("The agent model cache has been cleared.");
  };

  private _handleMessage = async (context: TurnContext, turnState: AppTurnState): Promise<void> => {
    const userMessage = context.activity.text || "";
    console.log(`\n[handleMessage] ===== NEW MESSAGE =====`);
    console.log(`[handleMessage] User message: ${userMessage}`);
    console.log(`[handleMessage] Activity ID: ${context.activity.id}`);

    try {
      context.streamingResponse.queueInformativeUpdate("Just a moment please...");
      console.log("[handleMessage] Queued initial informative update");

      console.log("[handleMessage] Creating AgentsClient...");
      const client = await this._createAgentsClient(context);
      console.log("[handleMessage] ✓ AgentsClient created");

      let agentModel = this.agentModelCache.get(config.agentId!);
      if (!agentModel) {
        console.log(`[handleMessage] Agent not in cache. Fetching agent ID: ${config.agentId}`);
        context.streamingResponse.queueInformativeUpdate("Connecting to Microsoft Foundry...");

        agentModel = await client.getAgent(config.agentId!);
        console.log(`[handleMessage] ✓ Agent retrieved: ${agentModel.name || agentModel.id}`);
        
        this.agentModelCache.set(config.agentId!, agentModel);
        console.log("[handleMessage] ✓ Agent cached");
      } else {
        console.log(`[handleMessage] ✓ Using cached agent: ${agentModel.name || agentModel.id}`);
      }

      const agentThread = await this._getConversationThread(client, turnState);
      console.log(`[handleMessage] ✓ Using thread: ${agentThread.id}`);

      context.streamingResponse.queueInformativeUpdate("Sending request to Microsoft Foundry Agent...");

      await client.messages.create(agentThread.id, "user", userMessage);
      console.log("[handleMessage] ✓ Message added to thread");

      console.log("[handleMessage] Starting streaming run...");
      const runResponse = client.runs.create(agentThread.id, agentModel.id);
      const stream = await runResponse.stream();
      console.log("[handleMessage] ✓ Streaming started");

      let chunkCount = 0;

      try {
        for await (const event of stream) {
          console.log(`[handleMessage] Stream event: ${event.event}`);

          if (event.event === "thread.message.delta" && event.data) {
            const deltaChunk = event.data as MessageDeltaChunk;

            if (deltaChunk.delta && deltaChunk.delta.content) {
              for (const content of deltaChunk.delta.content) {
                if (content.type === "text") {
                  const textContent = content as MessageDeltaTextContent;
                  if (textContent.text?.value) {
                    const chunkText = textContent.text.value;
                    chunkCount++;
                    
                    console.log(`[handleMessage] Chunk #${chunkCount}: "${chunkText}"`);
                    context.streamingResponse.queueTextChunk(chunkText);
                  }
                }
              }
            }
          }

          if (event.event === "thread.run.completed") {
            console.log("[handleMessage] ✓ Run completed successfully");
          }

          if (event.event === "thread.run.failed") {
            console.error("[handleMessage] ❌ Run failed:", event.data);
          }
        }

        console.log(`[handleMessage] Streaming complete. Total chunks: ${chunkCount}`);
      } catch (streamError) {
        const errorMessage = streamError instanceof Error ? streamError.message : String(streamError);
        console.error(`[handleMessage] ❌ Streaming error: ${errorMessage}`);
        context.streamingResponse.queueTextChunk(`\n\nAn error occurred during streaming: ${errorMessage}`);
      } finally {
        await context.streamingResponse.endStream();
        console.log("[handleMessage] ✓ Stream ended");
      }

      if (turnState?.conversation) {
        turnState.conversation.threadInfo = this._serializeThread(agentThread);
        console.log("[handleMessage] ✓ Thread saved to conversation state");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      console.error(`[handleMessage] ❌ Error: ${errorMessage}`);
      if (errorStack) {
        console.error(`[handleMessage] Stack trace:\n${errorStack}`);
      }
      try {
        context.streamingResponse.queueTextChunk(`An error occurred while processing your request. ${errorMessage}`);
        await context.streamingResponse.endStream();
      } catch (streamEndError) {
        console.error("[handleMessage] Error ending stream after error:", streamEndError);
      }
    }
  };
}

export const agentApp = new ProxyAgent();

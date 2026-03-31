import {
  AgentApplication,
  MemoryStorage,
  MessageFactory,
  TurnContext,
  TurnState,
} from "@microsoft/agents-hosting";
import { SSOCommandMap } from "./commands/SSOCommandMap";
import config from "./config";

export class TeamsBot extends AgentApplication<TurnState> {
  constructor() {
    super({
      storage: new MemoryStorage(),
      authorization: {
        graph: { name: config.botSsoConnectionName },
      },
    });

    this.onConversationUpdate("membersAdded", async (context: TurnContext, state: TurnState) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id) {
          await context.sendActivity("Welcome to the sso bot sample! Type 'show' to see your profile.");
          break;
        }
      }
    });

    this.authorization.onSignInSuccess(async (context: TurnContext, state: TurnState) => {
      console.log("User signed in successfully.");
    });

    this.authorization.onSignInFailure(async (context: TurnContext, state: TurnState, authId?: string, err?: string) => {
      console.error(`Sign in failure in ${authId}: ${err}`);
      await context.sendActivity(MessageFactory.text("Sign in failed. Please try again."));
    });

    this.onMessage("logout", async (context: TurnContext, state: TurnState) => {
      await this.authorization.signOut(context, state, "graph");
      await context.sendActivity(MessageFactory.text("You have been signed out."));
    });

    // Handle SSO commands that require a Graph token
    this.onActivity("message", async (context: TurnContext, state: TurnState) => {
      console.log("Running with Message Activity.");

      let txt = context.activity.text;
      const removedMentionText = context.activity.removeRecipientMention();
      if (removedMentionText) {
        txt = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
      }

      const SSOCommand = SSOCommandMap.get(txt);
      if (SSOCommand) {
        // Get the SSO token, then exchange for a Graph token via OBO
        const tokenResponse = await this.authorization.getToken(context, "graph");
        if (!tokenResponse?.token) {
          await context.sendActivity(MessageFactory.text("Unable to get token. Please sign in first."));
          return;
        }
        const oboResponse = await this.authorization.exchangeToken(context, "graph", {
          scopes: ["User.Read"],
        });
        if (!oboResponse?.token) {
          await context.sendActivity(MessageFactory.text("Unable to exchange token. Please try again."));
          return;
        }
        await SSOCommand.operationWithToken(context, oboResponse.token);
      } else {
        await context.sendActivity(MessageFactory.text(`You said: ${context.activity.text}. Try typing 'show'.`));
      }
    }, ["graph"]);
  }
}

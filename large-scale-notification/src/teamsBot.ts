import { AgentApplication, TurnContext } from "@microsoft/agents-hosting";

export const teamsBot = new AgentApplication();

// Customize your own bot logic here
teamsBot.onMessage("hello", async (context: TurnContext) => {
  await context.sendActivity(
    `Hi there! Echo what you said: ${context.activity.text}`
  );
});

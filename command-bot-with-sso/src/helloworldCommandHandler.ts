import { Activity, CardFactory, MessageFactory, TurnContext } from "botbuilder";
import * as ACData from "adaptivecards-templating";
import helloWorldCard from "./adaptiveCards/helloworldCommand.json";

/**
 * The `handleHelloWorldCommand` function responds
 * with an Adaptive Card when triggered.
 */
export async function handleHelloWorldCommand(
  context: TurnContext
): Promise<string | Partial<Activity>> {
  console.log(`Bot received message: ${context.activity.text}`);

  const cardJson = new ACData.Template(helloWorldCard).expand({
    $root: {
      title: "Your Hello World App is Running",
      body: "Congratulations! Your Hello World App is running. Open the documentation below to learn more about how to build applications with the Microsoft 365 Agents Toolkit.",
    },
  });

  return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
}

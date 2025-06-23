import { Activity, TurnContext } from "botbuilder";
import { Client } from "@microsoft/microsoft-graph-client";

/**
 * Handler for the profile command that retrieves the user's profile information
 * from Microsoft Graph using SSO.
 */
export async function handleProfileCommand(
  context: TurnContext,
  ssoToken: string
): Promise<string | Partial<Activity>> {
  await context.sendActivity(
    "Retrieving user information from Microsoft Graph ..."
  );

  const graphClient = Client.init({
    authProvider: (done) => {
      done(null, ssoToken);
    }
  });

  // Call graph api use `graph` instance to get user profile information
  const me = await graphClient.api("/me").get();

  if (me) {
    // Bot will send the user profile info to user
    return `Your command is '${context.activity.text}' and you're logged in as ${
      me.displayName
    } (${me.userPrincipalName})${
      me.jobTitle ? `; your job title is: ${me.jobTitle}` : ""
    }.`;
  } else {
    return "Could not retrieve profile information from Microsoft Graph.";
  }
}

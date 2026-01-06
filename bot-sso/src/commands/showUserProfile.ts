import { ResponseType, Client } from "@microsoft/microsoft-graph-client";
import { CardFactory, TurnContext } from "@microsoft/agents-hosting";
import { SSOCommand } from "./SSOCommand";
import { Activity } from "@microsoft/agents-activity";

export class ShowUserProfile implements SSOCommand {
  commandMessage = "show";

  // Note: The token passed here is already the exchanged access token (via OBO in teamsBotSsoPrompt),
  // NOT the original SSO token. So we can use it directly with Graph API.
  async operationWithSSOToken(context: TurnContext, accessToken: string) {
    await context.sendActivity(
      "Retrieving user information from Microsoft Graph ..."
    );

    // Use the already-exchanged access token directly
    // No need to do OBO again - it was already done in teamsBotSsoPrompt.ts
    const graphClient = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });
    
    const me = await graphClient.api("/me").get();
    if (me) {
      await context.sendActivity(
        `You're logged in as ${me.displayName} (${me.userPrincipalName})${
          me.jobTitle ? `; your job title is: ${me.jobTitle}` : ""
        }.`
      );

      // show user picture
      let photoBinary: ArrayBuffer;
      try {
        photoBinary = await graphClient
          .api("/me/photo/$value")
          .responseType(ResponseType.ARRAYBUFFER)
          .get();
      } catch {
        return;
      }

      const buffer = Buffer.from(photoBinary);
      const imageUri = "data:image/png;base64," + buffer.toString("base64");
      const card = CardFactory.adaptiveCard({
        type: "AdaptiveCard",
        body: [
          {
            type: "TextBlock",
            text: "User Picture",
            weight: "Bolder",
            size: "Medium"
          },
          {
            type: "Image",
            url: imageUri,
            size: "Large",
            horizontalAlignment: "Left"
          }
        ],
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        version: "1.4"
      });
      await context.sendActivity(Activity.fromObject({ attachments: [card], type: "message" }));
    } else {
      await context.sendActivity(
        "Could not retrieve profile information from Microsoft Graph."
      );
    }
  }
}

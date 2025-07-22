import { Activity, ActivityTypes, TurnContext } from "botbuilder";
import { Client } from "@microsoft/microsoft-graph-client";

/**
 * Handler for the photo command that retrieves the user's photo
 * from Microsoft Graph using SSO.
 */
export async function handlePhotoCommand(
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

  // You can add following code to get your photo:
  let photoUrl = "";
  try {
    const photo = await graphClient.api("/me/photo/$value").get();
    const arrayBuffer = await photo.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer, "binary");
    photoUrl = "data:image/png;base64," + buffer.toString("base64");
  } catch {
    // Could not fetch photo from user's profile, return empty string as placeholder.
  }
  if (photoUrl) {
    const photoMessage: Partial<Activity> = {
      type: ActivityTypes.Message,
      text: "This is your photo:",
      attachments: [
        {
          name: "photo.png",
          contentType: "image/png",
          contentUrl: photoUrl,
        },
      ],
    };
    return photoMessage;
  } else {
    return "Could not retrieve your photo from Microsoft Graph. Please make sure you have uploaded your photo.";
  }
}

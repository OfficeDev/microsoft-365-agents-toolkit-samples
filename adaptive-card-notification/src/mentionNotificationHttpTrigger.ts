import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as ACData from "adaptivecards-templating";
import { notificationApp } from "./internal/initialize";
import notificationTemplate from "./adaptiveCards/notification-mention.json";
import { MentionData } from "./cardModels";

const data: MentionData = {
  title: "New Event Occurred!",
  appName: "Contoso App",
  userId: "<user-id>",
  userName: "<user-name>",
  description: "Detailed description of what happened so the user knows what's going on.",
  notificationUrl: "https://www.adaptivecards.io/"
};

// HTTP trigger to send notification.
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const pageSize = 100;
  let continuationToken: string | undefined;
  do {
    const pagedInstallations = await notificationApp.getPagedInstallations(pageSize, continuationToken);
    continuationToken = pagedInstallations.continuationToken;
    const targets = pagedInstallations.data;
    for (const target of targets) {
      await target.sendAdaptiveCard(
        new ACData.Template(notificationTemplate).expand({ $root: data })
      );

      /** List all members then notify each member
      const memberPageSize = 10;
      let memberContinuationToken: string | undefined;
      do {
        const pagedMembers = await target.getPagedMembers(memberPageSize, memberContinuationToken);
        memberContinuationToken = pagedMembers.continuationToken;
        const members = pagedMembers.data;
        for (const member of members) {
          data.userId = member.account.email;
          data.userName = member.account.name;
          await target.sendAdaptiveCard(
            new ACData.Template(notificationTemplate).expand({ $root: data })
          );
        }
      } while (memberContinuationToken);
      */
    }
  } while (continuationToken);

  context.res = {};
};

export default httpTrigger;

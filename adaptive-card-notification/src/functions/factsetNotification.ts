import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as ACData from "adaptivecards-templating";
import { notificationApp } from "../internal/initialize";
import notificationTemplate from "../adaptiveCards/notification-factset.json";
import { FactsetData } from "../cardModels";

const data: FactsetData = {
  title: "New Event Occurred!",
  appName: "Contoso App",
  description: "Detailed description of what happened so the user knows what's going on.",
  notificationUrl: "https://www.adaptivecards.io/",
  factSet: {
    property1: "https://github.com/OfficeDev/TeamsFx",
    property2: "sample@contoso.com",
    property3: "2022-05-04",
  }
};

async function factsetNotification(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
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
    }
  } while (continuationToken);

  return { status: 200 };
}

app.http("factsetNotification", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "api/factset-notification",
  handler: factsetNotification,
});

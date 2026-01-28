import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as ACData from "adaptivecards-templating";
import { notificationApp } from "../internal/initialize";
import notificationTemplate from "../adaptiveCards/notification-columnset.json";
import { ColumnsetData } from "../cardModels";

const data: ColumnsetData = {
  title: "New Event Occurred!",
  appName: "Contoso App",
  description: "Detailed description of what happened so the user knows what's going on.",
  notificationUrl: "https://www.adaptivecards.io/",
  data: [
    {
      property1: "sample data",
      property2: "sample data",
      property3: "https://www.adaptivecards.io/",
    },
    {
      property1: "sample data",
      property2: "sample data",
      property3: "https://www.adaptivecards.io/",
    },
    {
      property1: "sample data",
      property2: "sample data",
      property3: "https://www.adaptivecards.io/",
    },
  ]
};

async function columnsetNotification(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
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

app.http("columnsetNotification", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "api/columnset-notification",
  handler: columnsetNotification,
});

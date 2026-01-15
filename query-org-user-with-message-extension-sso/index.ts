// Import required packages
import express from "express";
import path from "path";
import send from "send";
// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
import {
  ConfigurationServiceClientCredentialFactory,
  TurnContext,
  MemoryStorage,
  MessagingExtensionAttachment,
  CardFactory,
} from "botbuilder";

import config from "./config";
import { ApplicationBuilder,  TeamsAdapter, TurnState } from "@microsoft/teams-ai";
import { Client, ResponseType } from "@microsoft/microsoft-graph-client";

// Create adapter.
const adapter = new TeamsAdapter(
    {},
    new ConfigurationServiceClientCredentialFactory({
        MicrosoftAppId: config.MicrosoftAppId,
        MicrosoftAppPassword: config.MicrosoftAppPassword,
    })
);

// Catch-all for errors.
const onTurnErrorHandler = async (context: TurnContext, error: Error) => {
  // This check writes out errors to console log .vs. app insights.
  // NOTE: In production environment, you should consider logging this to Azure
  //       application insights.
  console.error(`\n [onTurnError] unhandled error: ${error}`);

  // Send a trace activity, which will be displayed in Bot Framework Emulator
  await context.sendTraceActivity(
    "OnTurnError Trace",
    `${error}`,
    "https://www.botframework.com/schemas/error",
    "TurnError"
  );

  if (context.activity.type == 'message') {
    // Send a message to the user
    await context.sendActivity('The bot encountered an error or bug.');
  }
};

// Set the onTurnError for the singleton BotFrameworkAdapter.
adapter.onTurnError = onTurnErrorHandler;

// Create express application.
const expressApp = express();
expressApp.use(express.json());

const server = expressApp.listen(
  process.env.port || process.env.PORT || 3978,
  () => {
    console.log(
      `\nBot Started, ${expressApp.name} listening to`,
      server.address()
    );
  }
);

const storage = new MemoryStorage();
const app = new ApplicationBuilder()
    .withStorage(storage)
    .withAuthentication(adapter, {
        settings: {
            graph: {
                scopes: ["User.Read.All", "User.Read"],
                msalConfig: {
                    auth: {
                        clientId: config.clientId,
                        clientSecret: config.clientSecret,
                        authority: `${config.authorityHost}/${config.tenantId}`
                    }
                },
                signInLink: `https://${config.botDomain}/auth-start.html`,
                endOnInvalidMessage: true
            }
        },
        autoSignIn: true
    })
    .build();

app.messageExtensions.query('searchQuery', async (_context: TurnContext, state: TurnState, query) => {
  const ssoToken = state.temp.authTokens['graph'];
  if (!ssoToken) {
    throw new Error('No auth token found in state. Authentication failed.');
  }

  const searchContext = query.parameters.searchQuery;
  const results: MessagingExtensionAttachment[] = [];

  const graphClient = Client.init({
    authProvider: (done) => {
      done(null, ssoToken);
    }
  });
  let users = await graphClient
    .api(`/users?$search="displayName:${searchContext}"&$count=true`)
    .header("ConsistencyLevel", "eventual")
    .orderby("displayName")
    .get();
  for (const user of users.value) {
    await getUserPhotoWithGraphClient(
      graphClient,
      results,
      user,
      `/users/${user.id}/photo/$value`
    );
  };

  return {
    type: "result",
    attachmentLayout: "list",
    attachments: results,
  };
});

app.messageExtensions.selectItem(async (_context: TurnContext, _state: TurnState, item) => {
    // Return results
    return {
        attachmentLayout: 'list',
        attachments: [CardFactory.heroCard(item.name, item.description)],
        type: 'result'
    };
});

app.messageExtensions.queryLink(async (_context: TurnContext, state: TurnState, _url: string) => {
    const ssoToken = state.temp.authTokens['graph'];
    if (!ssoToken) {
        throw new Error('No auth token found in state. Authentication failed.');
    }
  const results: MessagingExtensionAttachment[] = [];

  const graphClient = Client.init({
    authProvider: (done) => {
      done(null, ssoToken);
    }
  });
  const profile = await graphClient.api("/me").get();
  await getUserPhotoWithGraphClient(
    graphClient,
    results,
    profile,
    `/me/photo/$value`
  );

    return {
        type: 'result',
        attachments: results,
        attachmentLayout: 'list'
    };
});

// Listen for incoming requests.
expressApp.post("/api/messages", async (req, res) => {
  await adapter
    .process(req, res, async (context) => {
      await app.run(context);
    });
});

expressApp.get(["/auth-start.html", "/auth-end.html"], async (req, res) => {
  send(
    req,
    path.join(
      __dirname,
      "public",
      req.url.includes("auth-start.html") ? "auth-start.html" : "auth-end.html"
    )
  ).pipe(res);
});

async function getUserPhotoWithGraphClient(
  graphClient,
  attachments,
  user,
  apiPath
) {
  let image = undefined;
  try {
    let photoBinary = await graphClient
      .api(apiPath)
      .responseType(ResponseType.ARRAYBUFFER)
      .get();
    const buffer = Buffer.from(photoBinary);
    const imageUri = "data:image/png;base64," + buffer.toString("base64");
    image = CardFactory.images([imageUri]);
  } catch (err) {
    console.error("This user may not have personal photo!", err.message);
  }
  const thumbnailCard = CardFactory.thumbnailCard(
    user.displayName,
    user.mail,
    image ? image : ""
  );
  attachments.push(thumbnailCard);
}
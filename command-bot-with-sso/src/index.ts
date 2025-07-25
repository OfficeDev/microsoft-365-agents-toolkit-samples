// Import required packages
import express from "express";
import path from "path";
import send from "send";
import "isomorphic-fetch";
import { ApplicationBuilder, AuthError, TeamsAdapter, TurnState } from '@microsoft/teams-ai';
import { MemoryStorage, ConfigurationServiceClientCredentialFactory, TurnContext } from "botbuilder";
import config from "./internal/config";
import { handlePhotoCommand } from "./photoSsoCommandHandler";
import { handleHelloWorldCommand } from "./helloworldCommandHandler";
import { handleProfileCommand } from "./profileSsoCommandHandler";

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

const adapter = new TeamsAdapter(
    {},
    new ConfigurationServiceClientCredentialFactory({
        MicrosoftAppId: config.botId,
        MicrosoftAppPassword: config.botPassword,
    })
);

// Define storage and application
const storage = new MemoryStorage();
const app = new ApplicationBuilder()
    .withStorage(storage)
    .withAuthentication(adapter, {
        settings: {
            graph: {
                scopes: ['User.Read'],
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
        autoSignIn: (context) => {
          if (context.activity.type == "message" && (context.activity.text != "profile" && context.activity.text != "photo")) {
            return Promise.resolve(false);
          }
          return Promise.resolve(true);
        },
    })
    .build();

// Listen for user to say '/reset' and then delete conversation state
app.message('/reset', async (context: TurnContext, state: TurnState) => {
    state.deleteConversationState();
    await context.sendActivity(`Ok I've deleted the current conversation state.`);
});

app.message('/signout', async (context: TurnContext, state: TurnState) => {
    await app.authentication.signOutUser(context, state);

    // Echo back users request
    await context.sendActivity(`You have signed out`);
});

app.message("photo", async (context: TurnContext, state: TurnState) => {
    const token = state.temp.authTokens['graph'];
    if (!token) {
        await context.sendActivity('No auth token found in state. Authentication failed.');
        return;
    }

    const response = await handlePhotoCommand(context, token);
    await context.sendActivity(response);
});

app.message("helloworld", async (context: TurnContext, state: TurnState) => {
    const response = await handleHelloWorldCommand(context);
    await context.sendActivity(response);
});

app.message("profile", async (context: TurnContext, state: TurnState) => {
    const token = state.temp.authTokens['graph'];
    if (!token) {
        await context.sendActivity('No auth token found in state. Authentication failed.');
        return;
    }

    const response = await handleProfileCommand(context, token);
    await context.sendActivity(response);
});

app.authentication.get('graph').onUserSignInSuccess(async (context: TurnContext, state: TurnState) => {
    // Successfully logged in
    await context.sendActivity('Successfully logged in');
    await context.sendActivity(`Send the command again to get response: ${context.activity.text}`);
});

app.authentication
    .get('graph')
    .onUserSignInFailure(async (context: TurnContext, _state: TurnState, error: AuthError) => {
        // Failed to login
        await context.sendActivity('Failed to login');
        await context.sendActivity(`Error message: ${error.message}`);
    });

// Register an API endpoint with `express`. Teams sends messages to your application
// through this endpoint.
//
// The Microsoft 365 Agents Toolkit bot registration configures the bot with `/api/messages` as the
// Bot Framework endpoint. If you customize this route, update the Bot registration
// in `templates/azure/provision/botservice.bicep`.
// Process Teams activity with Bot Framework.
expressApp.post("/api/messages", async (req, res) => {
  await adapter.process(req, res, async (context: TurnContext) => {
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

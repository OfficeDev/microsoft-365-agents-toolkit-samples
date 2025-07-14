import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import config from "./config";
import { AppCredential } from "./AppCredential";

export function getGraphClient(): Client {
    const appCredential = new AppCredential({
        authorityHost: config.authorityHost,
        clientId: config.clientId,
        tenantId: config.tenantId,
        clientSecret: config.clientSecret,
    });
    const authProvider = new TokenCredentialAuthenticationProvider(
        appCredential,
        {
            scopes: ["https://graph.microsoft.com/.default"],
        }
    );
    const graphClient: Client = Client.initWithMiddleware({
        authProvider: authProvider,
    });
    return graphClient;
}
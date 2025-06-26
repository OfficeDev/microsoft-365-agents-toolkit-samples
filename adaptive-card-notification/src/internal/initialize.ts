import { NotificationBot } from "../notification/notification";
import { AuthConfiguration, loadAuthConfigFromEnv, CloudAdapter } from "@microsoft/agents-hosting";
import * as path from "path";
import { LocalConversationReferenceStore } from "../store/localStore";
import { BlobStore } from "../store/blobStore";

const authConfig: AuthConfiguration = loadAuthConfigFromEnv();
// Create adapter
export const adapter = new CloudAdapter(authConfig);

// You can use BlobStore for Azure Blob Storage
export const localStorage = new LocalConversationReferenceStore(
  path.resolve(process.env.RUNNING_ON_AZURE === "1" ? process.env.TEMP ?? "./" : "./")
);

// export const blobStorage = new BlobStore("{your-connection-string}", "{your-container-name}");

export const notificationApp = new NotificationBot(adapter, localStorage, authConfig.clientId);

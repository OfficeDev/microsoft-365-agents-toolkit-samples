import { NotificationBot } from "../notification/notification";
import { AuthConfiguration, loadAuthConfigFromEnv, CloudAdapter } from "@microsoft/agents-hosting";
import {
  managedIdentityId,
  storageAccountName,
  storageTableName,
} from "../consts";
import { TableStore } from "./tableStore";

const authConfig: AuthConfiguration = loadAuthConfigFromEnv();
// Create adapter
export const adapter = new CloudAdapter(authConfig);

// You can use BlobStore for Azure Blob Storage
export const tableStorage = new TableStore(
  managedIdentityId,
  `https:${storageAccountName}.table.core.windows.net`,
  storageTableName
);

export const notificationApp = new NotificationBot(adapter, tableStorage, authConfig.clientId);

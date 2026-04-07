import { NotificationBot } from "../notification/notification";
import { AuthConfiguration, loadAuthConfigFromEnv, CloudAdapter } from "@microsoft/agents-hosting";
import {
  managedIdentityId,
  storageAccountName,
  storageTableName,
} from "../consts";
import { TableStore } from "./tableStore";
import { AzureNamedKeyCredential } from "@azure/data-tables";

const authConfig: AuthConfiguration = loadAuthConfigFromEnv();
// Create adapter
export const adapter = new CloudAdapter(authConfig);

function createStorage() {
  if (process.env.TEAMSFX_ENV === "local") {
    // Use Azurite for local development
    const azuriteAccount = "devstoreaccount1";
    const azuriteKey = "Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==";
    const azuriteEndpoint = "http://127.0.0.1:10002/devstoreaccount1";
    const tableName = "installationstore";
    const credential = new AzureNamedKeyCredential(azuriteAccount, azuriteKey);
    return new TableStore(azuriteAccount, azuriteEndpoint, tableName, credential);
  }
  // You can use BlobStore for Azure Blob Storage
  return new TableStore(
    managedIdentityId,
    `https://${storageAccountName}.table.core.windows.net`,
    storageTableName
  );
}

export const tableStorage = createStorage();

export const notificationApp = new NotificationBot(adapter, tableStorage, authConfig.clientId);

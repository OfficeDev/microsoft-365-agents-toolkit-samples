const { NotificationBot } = require("../notification/notification");
const { loadAuthConfigFromEnv, CloudAdapter } = require("@microsoft/agents-hosting");
const { BlobStore } = require("../store/BlobStore");

const authConfig = loadAuthConfigFromEnv();
const adapter = new CloudAdapter(authConfig);

 const BLOB_CONTAINER = ""
 const BLOB_SECRET = process.env.BLOB_SECRET; 
 const blobStorage = new BlobStore(BLOB_SECRET, BLOB_CONTAINER);
 const notificationApp = new NotificationBot(adapter, blobStorage, authConfig.clientId);

module.exports = {
  adapter,
  notificationApp,
};

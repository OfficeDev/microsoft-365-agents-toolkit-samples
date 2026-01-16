const { ClientSecretCredential } = require ("@azure/identity");
const { Client } = require("@microsoft/microsoft-graph-client");
const { BlobServiceClient } = require("@azure/storage-blob");
const { TokenCredentialAuthenticationProvider } = require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');

class BlobStore {
  constructor(connectionString, containerName) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    this.client = blobServiceClient.getContainerClient(containerName);
    this.initializePromise = undefined;
  }

  /**
   * Reads and parses JSON blobs for the given keys.
   *
   * @param {string[]} keys - List of logical keys to read
   * @returns {Promise<Object>} Object keyed by input keys containing parsed data
   */  
  async read(keys) {
    await this.initialize();
   
    const result = {};
    for (const key of keys) {
      const blobName = this.normalizeKey(key);
      try {
        const stream = await this.client.getBlobClient(blobName).download();
        const content = await this.streamToBuffer(stream.readableStreamBody);
        result[key] = JSON.parse(content.toString());
      } catch (error) {
        if (error.statusCode !== 404) {
          throw error;
        }
      }
    }
    return result;
  }

  /**
   * Lists blobs with pagination support and returns parsed JSON content.
   *
   * @param {number} pageSize - Maximum number of items per page
   * @param {string} [continuationToken] - Token for fetching the next page
   * @returns {Promise<{data: Object[], continuationToken: string}>}
   */
  async list(pageSize, continuationToken) {
    await this.initialize();

    const result = [];
    const iterator = this.client.listBlobsFlat().byPage({ maxPageSize: pageSize, continuationToken });
    const response = (await iterator.next()).value;

    for (const blob of response.segment.blobItems) {
      try {
        const stream = await this.client.getBlockBlobClient(blob.name).download();
        const content = await this.streamToBuffer(stream.readableStreamBody);
        result.push(JSON.parse(content.toString()));
      } catch (error) {
        if (error.statusCode !== 404) {
          throw error;
        }
      }
    }

    return {
      data: result,
      continuationToken: response.continuationToken
    };
  }

  /**
   * Writes or updates blobs and maintains secondary indexes
   * for users and channels.
   *
   * @param {Object.<string, Object>} changes - Key-value pairs to persist
   * @returns {Promise<void>}
   */
  async write(changes) {
    await this.initialize();
  
    for (const key of Object.keys(changes)) {
      const blobName = this.normalizeKey(key);
      const reference = changes[key];
      const content = JSON.stringify(reference);
      let channelId = null;
      let userId = null;

      await this.client.getBlockBlobClient(blobName).upload(content,Buffer.byteLength(content));
      
      const conversationType = reference.conversation?.conversationType;

      if(conversationType === 'channel'){
        channelId = reference.conversation?.id;
      }else{
        userId = reference.user?.aadObjectId;
      }

      if (userId) {
        const email = await this.getUserEmail(userId);
        console.log('register user: ', email);
        const indexKey = (email) ? `index/user/${email}` : `index/user/${userId}`;
        const indexData = JSON.stringify({ blobName, type: conversationType, updated: new Date().toISOString()});
        await this.client.getBlockBlobClient(indexKey).upload(indexData, Buffer.byteLength(indexData));
      }else if(channelId){
        const indexKey = `index/channel/${channelId}`;
        const indexData = JSON.stringify({ blobName, type: conversationType, updated: new Date().toISOString()});
        await this.client.getBlockBlobClient(indexKey).upload(indexData, Buffer.byteLength(indexData));
      }
    }
   }

  /**
   * Fetches a user's email address from Microsoft Graph.
   * Requires Microsoft Graph **application permission**: User.ReadBasic.All
   * 
   * @param {string} userId - Azure AD object ID
   * @returns {Promise<string|null>} User email or null if unavailable
   */
  async getUserEmail(userId){
    try{
      const credential = new ClientSecretCredential(process.env.BOT_TENANT_ID, process.env.clientId, process.env.clientSecret);
      const authProvider = new TokenCredentialAuthenticationProvider(credential, {scopes: ['https://graph.microsoft.com/.default']});
      const client = Client.initWithMiddleware({ authProvider });
      const user = await client.api(`/users/${encodeURIComponent(userId)}`).select("mail,userPrincipalName").get();
      return user?.mail || user?.userPrincipalName || null;
    } catch (error) {
      console.error(`Error fetching email for user ${userId}:`, error.message);
      return null;
    }
  }

  /**
   * Finds stored data using a secondary index (user or channel).
   *
   * @param {string} id - User email/AAD ID or channel ID
   * @param {"personal"|"channel"} type - Index type
   * @returns {Promise<Object|null>} Parsed data or null if not found
   */
  async findById(id, type) {
    await this.initialize();
    try {
      const indexKey = (type === 'personal') ? `index/user/${id}`:`index/channel/${id}`;
      const indexBlob = this.client.getBlobClient(indexKey);
      const indexExists = await indexBlob.exists();
      if (!indexExists) {
        return null;
      }
      const indexStream = await indexBlob.download();
      const indexContent = await this.streamToBuffer(indexStream.readableStreamBody);
      const { blobName } = JSON.parse(indexContent.toString());
      const dataBlob = this.client.getBlobClient(blobName);
      const dataStream = await dataBlob.download();
      const dataContent = await this.streamToBuffer(dataStream.readableStreamBody);
      return JSON.parse(dataContent.toString());
    } catch (error) {
     if (error.statusCode === 404) {
       console.log(`Blob not found for aadObjectId: ${id}`);
       return null;
     }
     throw error;
    }
  }
 
  /**
   * Deletes blobs and their associated secondary indexes.
   *
   * @param {string[]} keys - Logical keys to delete
   * @returns {Promise<void>}
   */
  async delete(keys) {
   await this.initialize();
   for (const key of keys) {
     const blobName = this.normalizeKey(key);
     let channelId = null;
     let userId = null;
     try {
       const dataBlob = this.client.getBlobClient(blobName);
       const stream = await dataBlob.download();
       const content = await this.streamToBuffer(stream.readableStreamBody);
       const reference = JSON.parse(content.toString());
      
       if(reference.conversationType === 'channel'){
         channelId = reference.conversation?.id;
       }else{
         userId = reference.user?.aadObjectId;
       }

       if(userId) {
         const indexKey = `index/user/${userId}`;
         await this.client.getBlobClient(indexKey).deleteIfExists();
       }else if(channelId){
         const indexKey = `index/channel/${channelId}`;
         await this.client.getBlobClient(indexKey).deleteIfExists();
       }
       await dataBlob.delete();
     } catch (error) {
        if (error.statusCode !== 404) {
            throw error;
        }
     }
   }
  }

  /**
   * Ensures the container exists (lazy initialization).
   *
   * @returns {Promise<void>}
   */
  initialize() {
    if (!this.initializePromise) {
      this.initializePromise = this.client.createIfNotExists();
    }
    return this.initializePromise;
  }

  /**
   * Normalizes a logical key into a valid Azure Blob name.
   *
   * @param {string} key
   * @returns {string}
   */
  normalizeKey(key) {
    return encodeURIComponent(key);
  }

  /**
   * Converts a readable stream into a Buffer.
   *
   * @param {NodeJS.ReadableStream} stream
   * @returns {Promise<Buffer>}
   */
  streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on("data", (data) => {
        chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
      });
      stream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      stream.on("error", reject);
    });
  }

}

module.exports = { BlobStore };
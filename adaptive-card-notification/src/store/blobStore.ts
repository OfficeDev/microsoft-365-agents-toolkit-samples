import { ConversationReference } from "@microsoft/agents-activity";
import { ContainerClient, ContainerListBlobFlatSegmentResponse } from "@azure/storage-blob";
import { ManagedIdentityCredential } from "@azure/identity";
import { IStorage, PagedData } from "../notification/interface";

// A sample implementation to use Azure Blob Storage as conversation reference store
export class BlobStore implements IStorage {
  private readonly client: ContainerClient;
  private initializePromise?: Promise<unknown>;

  // This implementation uses connection string and container name to connect Azure Blob Storage
  constructor(connectionString: string, containerName: string) {
    this.client = new ContainerClient(connectionString, containerName);
  }

  /**
   * This implementation uses container URL and managed identity to connect Azure Blob Storage.
   * To use this, please follow the steps here (https://learn.microsoft.com/entra/identity-platform/multi-service-web-app-access-storage)
   * to enable managed identity and assign the necessary roles.
   * 
   * @param containerUrl - the container URL, e.g. `https://<account>.blob.core.windows.net/<container>`
   */ 
  // constructor(containerUrl: string) {
  //   this.client = new ContainerClient(containerUrl, new ManagedIdentityCredential());
  // }
  public async read(keys: string[]): Promise<{ [key: string]: Partial<ConversationReference> }> {
    await this.initialize();

    const result: { [key: string]: Partial<ConversationReference> } = {};
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

  public async write(changes: { [key: string]: Partial<ConversationReference> }): Promise<void> {
    await this.initialize();

    for (const key of Object.keys(changes)) {
      const blobName = this.normalizeKey(key);
      const reference = changes[key];
      const content = JSON.stringify(reference);
      await this.client.getBlockBlobClient(blobName).upload(content, Buffer.byteLength(content));
    }
  }

  public async delete(keys: string[]): Promise<void> {
    await this.initialize();

    for (const key of keys) {
      const blobName = this.normalizeKey(key);

      try {
        await this.client.getBlobClient(blobName).delete();
      } catch (error) {
        if (error.statusCode !== 404) {
          throw error;
        }
      }
    }
  }

  public async list(
    pageSize?: number,
    continuationToken?: string
  ): Promise<PagedData<Partial<ConversationReference>>> {
    await this.initialize();

    const result = new Array<Partial<ConversationReference>>();
    const iterator = this.client.listBlobsFlat().byPage({ maxPageSize: pageSize, continuationToken });
    const response: ContainerListBlobFlatSegmentResponse = (await iterator.next()).value;

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

  // Initialize to create container if not exists yet
  private initialize(): Promise<unknown> {
    if (!this.initializePromise) {
      this.initializePromise = this.client.createIfNotExists();
    }

    return this.initializePromise;
  }

  // A help method to normalize key to meet Azure Blob naming requirement
  private normalizeKey(key: string): string {
    return encodeURIComponent(key);
  }

  // A helper method used to read a Node.js readable stream into a Buffer
  private streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
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
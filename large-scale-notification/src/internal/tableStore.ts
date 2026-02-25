import { TableClient } from "@azure/data-tables";
import { ManagedIdentityCredential } from "@azure/identity";
import { ConversationReference } from "@microsoft/agents-activity";
import { IStorage, PagedData } from "../notification/interface";

import { InstallationReference } from "../types/installationReference";
import {
  constructConversationReference,
  extractKeyDataFromConversationReference,
} from "../util";

export class TableStore implements IStorage {
  private readonly client: TableClient;

  constructor(
    managedIdentityId: string,
    storageAccountURL: string,
    storageTableName: string,
  ) {
    const credential = new ManagedIdentityCredential({
      clientId: managedIdentityId,
    });

    this.client = new TableClient(
      `${storageAccountURL}`,
      `${storageTableName}`,
      credential,
      { allowInsecureConnection: true },
    );
  }

  public async read(
    keys: string[],
  ): Promise<{ [key: string]: Partial<ConversationReference> }> {
    const results: { [key: string]: Partial<ConversationReference> } = {};
    try {
      await Promise.all(
        keys.map(async (key) => {
          const entity: InstallationReference = await this.client.getEntity(
            this.hash(key),
            key,
          );
          results[key] = constructConversationReference(entity);
        }),
      );
    } catch (e: any) {
      // Optionally handle error
    }
    return results;
  }

  public async write(changes: {
    [key: string]: Partial<ConversationReference>;
  }): Promise<void> {
    /*
     * {
     *   "activityId":"f:4c06e7be-31d2-27d3-2c3f-e2c2ff775e0a",
     *   "user":{
     *     "id":"29:xxx",
     *     "aadObjectId":"xxx"
     *   },
     *   "bot":{
     *     "id":"28:xxx",
     *     "name":"notification-scale-demo"
     *   },
     *   "conversation":{
     *     "conversationType":"personal",
     *     "tenantId":"xxx",
     *     "id":"xxx"
     *   },
     *   "channelId":"msteams",
     *   "serviceUrl":"https://smba.trafficmanager.net/amer/"
     * }
     */
    for (const [key, reference] of Object.entries(changes)) {
      const task = {
        partitionKey: this.hash(key),
        rowKey: key,
        ...extractKeyDataFromConversationReference(reference),
      };
      try {
        await this.client.createEntity(task);
      } catch (e: any) {
        // Optionally handle error per entity
      }
    }
  }

  public async delete(keys: string[]): Promise<void> {
    try {
      await Promise.all(
        keys.map((key) => this.client.deleteEntity(this.hash(key), key)),
      );
    } catch (e: unknown) {
      // Optionally handle error
    }
  }

  public async list(
    pageSize?: number,
    continuationToken?: string,
  ): Promise<PagedData<Partial<ConversationReference>>> {
    const entities = await this.client
      .listEntities()
      .byPage({ maxPageSize: pageSize, continuationToken: continuationToken })
      .next();

    return {
      data: entities.value.map((entity) => {
        return constructConversationReference(entity);
      }),
      continuationToken: entities.value.continuationToken,
    };
  }

  private hash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return (
      (hash & 0xff).toString(16).padStart(2, "0") +
      ((hash >> 8) & 0xff).toString(16).padStart(2, "0")
    );
  }
}

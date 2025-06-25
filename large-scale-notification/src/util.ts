import { ConversationReference } from "@microsoft/agents-activity";

import { InstallationReference } from "./types/installationReference";

export function extractKeyDataFromConversationReference(reference: Partial<ConversationReference>): InstallationReference {
  return {
    userId: reference.user?.id,
    conversationType: reference.conversation?.conversationType,
    conversationId: reference.conversation?.id,
    tenantId: reference.conversation?.tenantId,
    serviceUrl: reference.serviceUrl,
  };
}

export function constructConversationReference(entity: InstallationReference): Partial<ConversationReference> {
  return {
    channelId: "msteams",
    agent: {
      id: `28:${process.env.clientId}`,
      name: "notification-scale-demo",
    },
    user: {
      id: entity.userId,
    },
    conversation: {
      conversationType: entity.conversationType,
      id: entity.conversationId,
      tenantId: entity.tenantId,
    },
    serviceUrl: entity.serviceUrl,
  } as Partial<ConversationReference>;
}

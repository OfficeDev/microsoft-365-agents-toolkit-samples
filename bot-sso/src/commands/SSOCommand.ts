import { TurnContext } from "@microsoft/agents-hosting";

export interface SSOCommand {
  commandMessage: string;
  operationWithToken(
    context: TurnContext, token: string
  ): Promise<any> | undefined;
}

import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { adapter } from "../internal/initialize";

export async function messages(
  request: HttpRequest,
  _context: InvocationContext
): Promise<HttpResponseInit> {
  const body = await request.json();
  const compatibleReq = {
    body,
    headers: Object.fromEntries(request.headers.entries()),
    method: request.method,
  };

  let status = 200;
  let returnBody: unknown = null;
  const response = {
    status: (code: number) => { status = code; },
    send: (b: unknown) => { returnBody = b; },
    setHeader: () => {},
    end: () => {},
  };

  await adapter.process(
    compatibleReq as any,
    response as any,
    async (_turnContext) => {
      // Add your bot logic here if needed
    }
  );

  return {
    status,
    body: returnBody ? JSON.stringify(returnBody) : undefined,
  };
}

app.http("messages", { handler: messages });

import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { adapter } from "../internal/initialize";
import { teamsBot } from "../teamsBot";

async function messageHandler(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  // Parse body from Azure Functions v4 HttpRequest
  const body = await req.json();

  // Create a compatible request object for the adapter
  const compatibleReq = {
    body: body,
    headers: Object.fromEntries(req.headers.entries()),
    method: req.method,
    query: Object.fromEntries(req.query.entries()),
  };

  let status = 200;
  let returnBody: unknown = null;

  const res = {
    status: (code: number) => {
      status = code;
    },
    send: (body: unknown) => {
      returnBody = body;
    },
    setHeader: () => {},
    end: () => {},
  };

  await adapter.process(compatibleReq as any, res as any, async (turnContext) => {
    await teamsBot.run(turnContext);
  });

  return {
    status,
    body: returnBody ? JSON.stringify(returnBody) : undefined,
  };
}

app.http("messageHandler", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "api/messages",
  handler: messageHandler,
});

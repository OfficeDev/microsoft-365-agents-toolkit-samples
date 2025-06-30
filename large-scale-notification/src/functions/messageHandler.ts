import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { adapter } from "../internal/initialize";
import { teamsBot } from "../teamsBot";

export async function messages(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const res: HttpResponseInit = { status: 200 };
  const response = {
    end: () => {},
    header: (name: string, value: unknown) => {
      res.headers = res.headers || {};
      res.headers[name] = value;
    },
    send: (body: unknown) => {
      res.body = body as string;
    },
    status: (code) => {
      res.status = code;
    },
    socket: {},
  } as any;
  await adapter.process(
    await requestAdaptor(request),
    response,
    async (context) => {
      await teamsBot.run(context);
    }
  );
  return res;
}

async function requestAdaptor(request: HttpRequest): Promise<any> {
  return {
    body: (await request.json()) as any,
    headers: (await Promise.all(request.headers.entries())).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {}
    ),
    method: request.method,
  };
}

app.http("messages", { handler: messages });

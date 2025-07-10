/* This code sample provides a starter kit to implement server side logic for your Teams App in TypeScript,
 * refer to https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference for complete Azure Functions
 * developer guide.
 */

// Import polyfills for fetch required by msgraph-sdk-javascript.
import "isomorphic-fetch";
import { app, InvocationContext, HttpRequest, HttpResponseInit } from "@azure/functions";
import { Client } from "@microsoft/microsoft-graph-client";
import { getGraphClient } from "../graphClient";

/**
 * @param {HttpRequest} req - The HTTP request.
 * @param {InvocationContext} context - The Azure Functions context object.
 */
export async function status(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("HTTP trigger function processed a request.");

  // Initialize response.
  const res: HttpResponseInit = {
    status: 200,
    jsonBody: {},
  };

  // Query status of schema
  try {
    const graphClient: Client = getGraphClient();
    const location = req.query.get("location");
    const result = await graphClient.api(location).get();
    res.jsonBody.status = result.status;
  } catch (e) {
    context.error(e);
    return {
      status: e?.statusCode ?? 500,
      jsonBody: {
        error: "Failed to check connection schema status: " + e.toString(),
      },
    };
  }

  return res;
}

app.http("status", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: status,
});
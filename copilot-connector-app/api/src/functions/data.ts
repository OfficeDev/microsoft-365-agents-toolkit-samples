// Import polyfills for fetch required by msgraph-sdk-javascript.
import "isomorphic-fetch";
import { app, InvocationContext, HttpRequest, HttpResponseInit } from "@azure/functions";
import { Client } from "@microsoft/microsoft-graph-client";
import { getGraphClient } from "../graphClient";
import { readFile } from "fs/promises";
import * as path from "path";
import { parse } from "csv-parse/sync";

/**
 * @param {HttpRequest} req - The HTTP request.
 * @param {InvocationContext} context - The Azure Functions context object.
 */
export async function data(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("HTTP trigger function processed a request.");

  const connectionId = req.query.get("connectionId");

  // Initialize response.
  const res: HttpResponseInit = {
    status: 200,
    jsonBody: {},
  };

  // Ingest data
  try {
    const csvFileContent = (
      await readFile(
        path.join(
          "assets",
          "ApplianceParts.csv"
        )
      )
    ).toString();
    const records = parse(csvFileContent, {
      columns: true,
      skip_empty_lines: true,
    });
    const graphClient: Client = getGraphClient();
    for (const item of records) {
      await graphClient
        .api(`/external/connections/${connectionId}/items/${item.PartNumber}`)
        .put({
          acl: [
            {
              type: "everyone",
              value: "c5f19b2d-0a77-454a-9b43-abf298c3b34e",
              accessType: "grant",
            },
          ],
          properties: {
            partNumber: Number(item.PartNumber),
            name: item.Name,
            description: item.Description,
            price: Number(item.Price),
            inventory: Number(item.Inventory),
            appliances: item.Appliances.split(";"),
            "appliances@odata.type": "Collection(String)",
          },
          content: {
            type: "text",
            value: item.Description,
          },
        });
    }
  } catch (e) {
    context.error(e);
    return {
      status: e?.statusCode ?? 500,
      jsonBody: {
        error: "Failed to ingest items: " + e.toString(),
      },
    };
  }

  return res;
}

app.http("data", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: data,
});
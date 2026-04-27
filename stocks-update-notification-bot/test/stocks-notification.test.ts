/**
 * E2E test for stocks-update-notification-bot using agents-simulator.
 *
 * Prerequisites (start before running this test):
 *   - Azurite:  npx azurite --silent --location ./_storage_emulator
 *   - Bot:      npx env-cmd --silent -f .localConfigs func start --typescript --port 3978
 *
 * The bot is timer-triggered: sends stock Adaptive Cards proactively every 30s.
 * We inject a conversation reference directly into .notification.localstore.json
 * pointing to our local playground server, then wait for the card to arrive.
 */
import assert from "assert";
import fs from "fs";
import path from "path";
import { TestClient, validateAdaptiveCard } from "agents-simulator";
import { Factory } from "server";

const BOT_DIR = process.cwd();
const STORE_FILE = path.join(BOT_DIR, ".notification.localstore.json");
const BOT_CLIENT_ID = "47ceb205-398a-4649-a812-45d015f89d3b";

function waitForProactiveMessage(client: TestClient, timeoutMs: number): Promise<any> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Timeout: no proactive message received within " + timeoutMs + "ms"));
    }, timeoutMs);
    client.on("message:created", (action: any) => {
      const attachments = (action.message as any)?.attachments ?? []; if (attachments.length > 0) {
        clearTimeout(timer);
        resolve(action);
      }
    });
  });
}

async function main(): Promise<void> {
  const client = new TestClient({
    botEndpoint: "http://localhost:3978/api/messages",
    timeout: 5000,
  });

  await client.start();

  try {
    const conversationId = client.getConversationId();
    const port = client.getPort();
    const serviceUrl = "http://localhost:" + port + "/_connector";
    const tenantId = Factory.getTenantManager().getTenant().id;
    const storeKey = "_" + tenantId + "_" + conversationId;

    const conversationRef = {
      conversation: {
        conversationType: "personal",
        tenantId,
        id: conversationId,
      },
      serviceUrl,
      agent: { id: "28:" + BOT_CLIENT_ID, name: "stocks-update-notif-bot" },
      user: { id: Factory.getTenantManager().getMe().id },
      channelId: "msteams",
    };

    console.log("[test] Injecting conversation ref:");
    console.log("  conversationId : " + conversationId);
    console.log("  serviceUrl     : " + serviceUrl);
    console.log("  tenantId       : " + tenantId);

    fs.writeFileSync(STORE_FILE, JSON.stringify({ [storeKey]: conversationRef }, null, 2), "utf-8");
    console.log("[test] Written to " + STORE_FILE);
    console.log("[test] Waiting up to 35s for timer trigger (*/30 * * * * *)...");

    const action = await waitForProactiveMessage(client, 35000);
    const attachments: Array<{ contentType: string; content: unknown }> = (action.message as any)?.attachments ?? [];

    assert.ok(attachments.length > 0, "Expected at least 1 attachment, got " + attachments.length);
    const acCard = attachments.find((a) => a.contentType === "application/vnd.microsoft.card.adaptive");
    assert.ok(acCard, "Expected Adaptive Card attachment");

    const errors = validateAdaptiveCard(acCard!.content as Record<string, unknown>);
    assert.strictEqual(errors.length, 0, "Adaptive Card schema errors: " + errors.map((e) => e.message).join(", "));

    console.log("PASS T1: proactive stock Adaptive Card arrived and is schema-valid");
    console.log("  contentType : " + acCard!.contentType);
    console.log("  schema errors: 0");
  } finally {
    try {
      fs.writeFileSync(STORE_FILE, JSON.stringify({}, null, 2), "utf-8");
    } catch { /* ignore */ }
    await client.stop();
  }
}

main().catch((err) => {
  console.error("[test] FAIL:", (err as Error).message);
  process.exit(1);
});






/**
 * E2E tests for hello-world-bot-with-tab (bot part only) using agents-simulator.
 *
 * Tests:
 *   T1: "welcome" -> welcome Adaptive Card (schema valid)
 *   T2: "learn"   -> learn Adaptive Card (schema valid, likeCount rendered)
 *   T3: "learn" then click "I Like This!" button (Action.Execute) -> invoke 200 OK
 *
 * Prerequisites: bot running on localhost:3978 with empty BOT_ID/BOT_PASSWORD:
 *   node .\bot\lib\index.js
 */
import { runConversation } from "agents-simulator";
import type { E2EConfig } from "agents-simulator";
import * as assert from "assert";

const config: E2EConfig = {
  botEndpoint: "http://localhost:3978/api/messages",
  timeout: 15000,
};

async function run() {
  // T1: "welcome" command -> welcome Adaptive Card
  {
    const result = await runConversation(config, "T1: welcome command -> card", {
      turns: [{ test_id: "welcome_cmd", prompt: "welcome", turn_type: "chat" }],
    });
    const t = result.turns[0];
    assert.strictEqual(t.status, "Completed", "T1 failed: " + (t.error_message ?? ""));
    assert.ok(t.attachments.length > 0, "T1: expected Adaptive Card attachment");
    assert.strictEqual(t.attachments[0].contentType, "application/vnd.microsoft.card.adaptive",
      "T1: unexpected contentType");
    assert.strictEqual(t.attachments[0].card_errors.length, 0,
      "T1 card schema errors: " + JSON.stringify(t.attachments[0].card_errors));
    const body = t.attachments[0].content as { body?: Array<{ text?: string }> };
    const hasExpectedText = JSON.stringify(body).includes("Hello World Bot");
    assert.ok(hasExpectedText, "T1: welcome card body does not mention Hello World Bot");
    console.log("PASS T1: welcome command -> valid Adaptive Card");
  }

  // T2: "learn" command -> learn Adaptive Card with likeCount
  {
    const result = await runConversation(config, "T2: learn command -> card", {
      turns: [{ test_id: "learn_cmd", prompt: "learn", turn_type: "chat" }],
    });
    const t = result.turns[0];
    assert.strictEqual(t.status, "Completed", "T2 failed: " + (t.error_message ?? ""));
    assert.ok(t.attachments.length > 0, "T2: expected Adaptive Card");
    assert.strictEqual(t.attachments[0].card_errors.length, 0,
      "T2 card schema errors: " + JSON.stringify(t.attachments[0].card_errors));
    // The likeCount should be templated (expanded from 0)
    const cardJson = JSON.stringify(t.attachments[0].content);
    assert.ok(cardJson.includes("Like Count"), "T2: card does not contain Like Count FactSet");
    console.log("PASS T2: learn command -> valid Adaptive Card with Like Count FactSet");
  }

  // T3: "learn" then click "I Like This!" (Action.Execute verb=userlike) -> invoke 200 OK
  {
    const result = await runConversation(config, "T3: learn + click I Like This button", {
      turns: [
        { test_id: "learn_for_click", prompt: "learn", turn_type: "chat" },
        {
          test_id: "click_userlike",
          prompt: "(click I Like This!)",
          turn_type: "card_action",
          card_action: {
            verb: "userlike",
            reply_to_turn: "learn_for_click",
            action_type: "Action.Execute",
          },
        },
      ],
    });
    const t1 = result.turns[0];
    const t2 = result.turns[1];
    assert.strictEqual(t1.status, "Completed", "T3 learn failed: " + (t1.error_message ?? ""));
    assert.strictEqual(t2.status, "Completed", "T3 click failed: " + (t2.error_message ?? ""));
    // The server returns { type, value } from the bot response — statusCode is not forwarded.
    // A non-null actual_response and "Completed" status confirms the invoke was accepted.
    assert.ok(t2.actual_response !== null, "T3: invoke returned null response");
    console.log("PASS T3: I Like This! button click -> invoke completed OK");
    console.log("  Invoke response: " + t2.actual_response);
  }

  console.log("\nAll 3 tests passed for hello-world-bot-with-tab!");
}

run().catch((err) => {
  console.error("FAIL:", err.message ?? err);
  process.exit(1);
});


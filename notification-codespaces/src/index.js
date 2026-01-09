const notificationTemplate = require("./adaptiveCards/notification-default.json");
const { notificationApp, adapter } = require("./internal/initialize");
const ACData = require("adaptivecards-templating");
const { TeamsBot } = require("./teamsBot");
const express = require("express");

// Create express application.
const expressApp = express();
expressApp.use(express.json());

const server = expressApp.listen(
  process.env.port || process.env.PORT || 3978,
  () => {
    console.log(
      `\nBot Started, ${expressApp.name} listening to`,
      server.address()
    );
  }
);

// HTTP trigger to send notification. You need to add authentication / authorization for this API. Refer https://aka.ms/teamsfx-notification for more details.
expressApp.post("/api/notification", async (req, res) => {
  // Accept optional payload to customize notification:
  // - { "text": "plain message" }
  // - { "card": <adaptive card JSON> }
  // - { "templateRoot": { title, appName, description, notificationUrl } }
  const body = req.body || {};
  const pageSize = 100;
  let continuationToken = undefined;
  const sentResults = []; // Track results
  
  console.log(`\n[/api/notification] POST received`);
  console.log(`  Payload: ${JSON.stringify(body).substring(0, 200)}`);

  do {
    const pagedData = await notificationApp.getPagedInstallations(pageSize, continuationToken);
    const installations = pagedData.data;
    continuationToken = pagedData.continuationToken;

    for (const target of installations) {
      const result = {
        type: target.type,
        conversationId: target.conversationReference?.conversation?.id?.substring(0, 50),
        userName: target.conversationReference?.user?.name,
        status: "pending",
        message: "",
      };

      try {
        // If client provided a full adaptive card JSON, send it directly.
        if (body.card && typeof body.card === "object") {
          await target.sendAdaptiveCard(body.card);
          result.status = "sent";
          result.message = "Sent adaptive card";
        }
        // If client provided plain text, send as text message.
        else if (typeof body.text === "string" && body.text.length > 0) {
          await target.sendMessage(body.text);
          result.status = "sent";
          result.message = `Sent text: "${body.text}"`;
        }
        // If client provided templateRoot, expand the template with custom values.
        else if (body.templateRoot && typeof body.templateRoot === "object") {
          const root = Object.assign(
            {
              title: "New Event Occurred!",
              appName: "Contoso App Notification",
              description: `This is a sample http-triggered notification to ${target.type}`,
              notificationUrl: "https://aka.ms/teamsfx-notification-new",
            },
            body.templateRoot
          );
          await target.sendAdaptiveCard(new ACData.Template(notificationTemplate).expand({ $root: root }));
          result.status = "sent";
          result.message = `Sent card with template: ${root.title}`;
        }
        // Default behavior: use template with default values
        else {
          await target.sendAdaptiveCard(
            new ACData.Template(notificationTemplate).expand({
              $root: {
                title: "New Event Occurred!",
                appName: "Contoso App Notification",
                description: `This is a sample http-triggered notification to ${target.type}`,
                notificationUrl: "https://aka.ms/teamsfx-notification-new",
              },
            })
          );
          result.status = "sent";
          result.message = "Sent default notification card";
        }
      } catch (err) {
        result.status = "failed";
        result.message = err.message;
        console.error(`  ✗ Error sending to ${target.type}: ${err.message}`);
      }

      sentResults.push(result);
      console.log(`  ✓ ${target.type}: ${result.message}`);
    }
  } while (continuationToken);

  console.log(`\n  Total sent to ${sentResults.length} target(s)\n`);
  res.json({
    success: true,
    payload: body,
    sent_to: sentResults.length,
    results: sentResults,
  });
});

// Endpoint to view stored conversation references (for debugging)
expressApp.get("/api/debug/installations", async (req, res) => {
  try {
    const installations = await notificationApp.getPagedInstallations(100);
    const data = installations.data.map((inst) => ({
      type: inst.type,
      conversationType: inst.conversationReference?.conversation?.conversationType,
      conversationId: inst.conversationReference?.conversation?.id,
      userId: inst.conversationReference?.user?.id,
      userName: inst.conversationReference?.user?.name,
      tenantId: inst.conversationReference?.conversation?.tenantId,
    }));
    res.json({ count: data.length, installations: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to view stored references file (raw JSON)
expressApp.get("/api/debug/storage", async (req, res) => {
  try {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.resolve(process.env.RUNNING_ON_AZURE === "1" ? process.env.TEMP ?? "./" : "./", ".notification.localstore.json");
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      res.json(JSON.parse(content));
    } else {
      res.json({ message: "Storage file not found yet (no conversations saved)" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bot Framework message handler.
const teamsBot = new TeamsBot();
expressApp.post("/api/messages", async (req, res) => {
  const activity = req.body;
  console.log(`\n[/api/messages] Received activity:`);
  console.log(`  Type: ${activity.type}`);
  console.log(`  From: ${activity.from?.name} (${activity.from?.id})`);
  console.log(`  Text: ${activity.text?.substring(0, 100) || "(no text)"}`);
  if (activity.entities) {
    const mentions = activity.entities.filter((e) => e.type === "mention");
    if (mentions.length > 0) {
      console.log(`  Mentions: ${mentions.map((m) => m.mentioned?.name).join(", ")}`);
    }
  }
  await adapter.process(req, res, async (context) => {
    await teamsBot.run(context);
  });
});

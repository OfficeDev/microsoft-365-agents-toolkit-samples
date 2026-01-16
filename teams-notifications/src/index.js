const { notificationApp, adapter } = require("./internal/initialize");
const { TeamsBot } = require("./teamsBot");
const express = require("express");
const { sendToUser, sendToChannel } = require("./messageFactory"); 


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

// Health check endpoint for monitoring and readiness probes
expressApp.get('/api/health', async (req, res) => { 
  res.status(200).send('App is running!'); 
});

/**
 * HTTP endpoint to trigger Teams notifications.
 * Supports sending messages either to:
 *  - a specific channel (by channelId)
 *  - a specific user (by email)
 *
 * NOTE: Authentication and authorization should be added before exposing this endpoint.
 */
expressApp.post("/api/notification", async (req, res) => {
  const { channelId, email, message, adaptiveCard } = req.body;
  
  // ---- Input validation ----
  if (!email && !channelId) {
    return res.status(400).send({ error: "Either email or channelId is required." });
  }else if (!message) {
    return res.status(400).send({ error: "Message parameter is required." });
  }
  
  try {
    // ---- Send notification to a channel ----
    if (channelId) {
      const channel = await notificationApp.findById(channelId, "channel");

      if (!channel) {
        return res.status(404).send({ error: `Channel: ${channelId} not found` });
      }

      await sendToChannel(channel, adaptiveCard, message, null);
      return res.status(200).send({ status: `Notification sent successfully to channel: ${channelId}`});
    }

    // ---- Send notification to a user ----
    const user = await notificationApp.findById(email, "personal");
    if (!user){
      return res.status(404).send({ error: `No users found for email: ${email}` });
    }

    const userName = user.account?.name || user.displayName || email; // Resolve display name
    await sendToUser(user, adaptiveCard, message, userName);
    return res.status(200).send({status: "Notification sent successfully", email });

  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: error.message });
  }

});

// Bot Framework message handler.
const teamsBot = new TeamsBot();
expressApp.post("/api/messages", async (req, res) => {
  await adapter.process(req, res, async (context) => {
    await teamsBot.run(context);
  });
});

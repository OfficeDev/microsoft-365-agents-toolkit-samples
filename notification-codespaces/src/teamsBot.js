const { TeamsActivityHandler } = require("@microsoft/agents-hosting-teams");
const { notificationApp } = require("./internal/initialize");
const ACData = require("adaptivecards-templating");
const notificationTemplate = require("./adaptiveCards/notification-default.json");

class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();
  }

  async onMessage(context, next) {
    try {
      console.log(`\n[TeamsBot.onMessage] Message from ${context.activity.from?.name}:`);
      console.log(`  Text: ${context.activity.text?.substring(0, 100)}`);
      
      const mentions = (context.activity.entities || []).filter((e) => e.type === "mention");
      console.log(`  Mentions detected: ${mentions.length}`);
      
      const botMentioned = mentions.some((m) => m.mentioned?.id === context.activity.recipient?.id);
      if (botMentioned) {
        console.log(`  ✓ Bot mentioned! Activity from AAD ID: ${context.activity.from?.aadObjectId}`);
        
        const fromAad = context.activity.from?.aadObjectId;
        const member = await notificationApp.findMember(async (m) => m.account?.aadObjectId === fromAad);
        
        if (member) {
          console.log(`  ✓ Found personal conversation reference, sending notification...`);
          const card = new ACData.Template(notificationTemplate).expand({
            $root: {
              title: "Bạn vừa mention bot",
              appName: "Contoso App Notification",
              description: "Bot gửi thông báo cá nhân cho bạn.",
              notificationUrl: "",
            },
          });
          await member.sendAdaptiveCard(card);
        } else {
          console.log(`  ✗ No personal reference found, replying in current context...`);
          await context.sendActivity("Mình đã nhận mention! Bạn cần mở 1:1 chat với bot trước để nhận thông báo cá nhân.");
        }
      }
    } catch (err) {
      console.error("Error handling mention:", err);
    }

    await next();
  }
}

module.exports.TeamsBot = TeamsBot;

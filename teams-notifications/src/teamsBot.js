const { TeamsActivityHandler } = require("@microsoft/agents-hosting-teams");

// An empty teams activity handler.
// You can add your customization code here to extend your bot logic if needed.
class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();

    // Triggered when new members are added to the conversation.
    this.onMembersAdded(async (context, next) => {
    const membersAdded = context.activity.membersAdded || [];
    for (const member of membersAdded) {
      if (member) {
        await context.sendActivity( "Welcome to Contoso Notification-App ");
        break;
      }
    }
    
    await next();
    });

  }
}

module.exports.TeamsBot = TeamsBot;

const { AgentApplication } = require("@microsoft/agents-hosting");

// An empty agent application handler.
// You can add your customization code here to extend your bot logic if needed.
class TeamsBot extends AgentApplication {
  constructor() {
    super();
  }
}

module.exports.TeamsBot = TeamsBot;

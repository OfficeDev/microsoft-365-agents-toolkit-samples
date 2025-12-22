export interface Config {
  azureAIFoundryProjectEndpoint?: string;
  agentId?: string;
  ssoConnectionName: string;
}

const config: Config = {
  //Microsoft Foundry configuration
  azureAIFoundryProjectEndpoint: process.env.AZURE_AI_FOUNDRY_PROJECT_ENDPOINT,

  agentId: process.env.AGENT_ID,

  // OAuth connection name for SSO - Should point to the AI Foundry SSO setup for the agent to work.
  ssoConnectionName: process.env.AIFOUNDRYCONNECTIONNAME || "SsoConnection",
};

export default config;

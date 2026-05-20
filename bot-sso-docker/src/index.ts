// Import required packages
import { startServer } from "@microsoft/agents-hosting-express";
import { TeamsBot } from "./teamsBot";

const bot = new TeamsBot();

startServer(bot);

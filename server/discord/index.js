// Bot settings
const Discord = require("discord.js");
const botToken = process.env.BOT_TOKEN;
exports.prefix = "!";
const channelId = process.env.CHANNEL_ID;

// Create bot client
exports.client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
  ],
  partials: ["CHANNEL"],
});

// Set commands
require("./commands.js");

// General bot methods
require("./functions.js");

// Log in to Discord
this.client.login(botToken);

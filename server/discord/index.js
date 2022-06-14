// Bot settings
const Discord = require("discord.js");
const botToken = process.env.BOT_TOKEN;
const prefix = "!";
const channelId = process.env.CHANNEL_ID;

// Create bot client
const client = new Discord.Client({
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
require("./commands.js")(client, prefix);

// Set events
require("./events.js")(client, channelId);

// Log in to Discord
client.login(botToken);

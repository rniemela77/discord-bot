const Discord = require("discord.js");

// Bot settings
const botToken = process.env.BOT_TOKEN;
const prefix = "!";

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

// Bot commands
require("./commands.js")(client, prefix);

client.login(botToken);

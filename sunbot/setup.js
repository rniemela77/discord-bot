module.exports = function () {
  let module = {};

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

  // Function to start bot
  module.login = function () {
    client.login(botToken);
  };

  return module;
};

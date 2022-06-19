const taskList = require("../../database/tasks.js");
const userList = require("../../database/users.js");

const getDiscordIdFromUsername = (username) => {
  const user = userList.users.find((user) => user.username === username);
  if (user) {
    return user.discordUserId;
  } else {
    return null;
  }
};

exports.getDiscordIdFromUsername = getDiscordIdFromUsername;

const taskList = require("../../database/tasks.js");
const userList = require("../../database/users.js");

exports.getDiscordIdFromUsername = (username) => {
  const user = userList.users.find((user) => user.username === username);
  if (user) {
    return user.discordUserId;
  } else {
    return null;
  }
};

const planList = require("../../database/plans.js");
const userList = require("../../database/users.js");

exports.getDiscordIdFromUsername = (username) => {
  const user = userList.users.find((user) => user.username === username);
  if (user) {
    return user.discordUserId;
  } else {
    return null;
  }
};

exports.isUserAwake = (username, time) => {
  const user = userList.users.find((user) => user.username === username);
  if (user) {
    const wakeTime = user.wakeTime;
    const sleepTime = user.sleepTime;
    if (time >= wakeTime && time <= sleepTime) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

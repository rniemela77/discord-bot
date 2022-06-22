const { client } = require("./index.js");
const { users } = require("../../database/users.js");
const { getCurrentTime } = require("../utilities/helpers.js");
const { queue } = require("../../database/messages.js");
const { isUserAwake } = require("../utilities/users.js");

exports.messageUser = async (userId, message) => {
  const user = users.find((user) => user.discordUserId === userId);
  const currentTime = getCurrentTime();
  const userWakeTime = user.wakeTime;

  // compare HH:MM times
  if (!isUserAwake(user.username, currentTime)) {
    console.log("too early for user");
    queue.push({ username: user.username, message });
    return;
  }

  await client.users
    .fetch(userId)
    .then((user) => {
      user.send(message);
    })
    .catch((err) => {
      console.log("messageUser() error:" + err.message + ". userId:" + userId);
    });
};

/*
  This may need to be wrapped with client.on("ready").
  Will see during production if this is needed.

  // const loggit = async () => {
//   client.on("ready", async () => {
//     await client.users
//       .fetch("288080302377795585")
//       .then((user) => {
//         user.send(`test`);
//         console.log("sent..!");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// };
*/

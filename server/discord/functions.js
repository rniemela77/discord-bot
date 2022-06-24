const { client } = require("./index.js");
const { users } = require("../../database/users.js");
const { getCurrentTime } = require("../utilities/helpers.js");
const { queue } = require("../../database/messages.js");
const { isUserAwake } = require("../utilities/users.js");

exports.messageUser = async (userId, message) => {
  // Find user in DB
  const user = users.find((user) => user.discordUserId === userId);

  // If a message is being sent to a user outside of their waking hours,
  // AND the message is not already in the queue,
  // store it in the message queue
  if (
    !isUserAwake(user.username, getCurrentTime()) &&
    !queueContainsMessage(user.username, message)
  ) {
    queue.push({ username: user.username, message });
    return;
  }

  // Otherwise, send the message to the user
  await client.users
    .fetch(userId)
    .then((user) => {
      user.send(message);
    })
    .catch((err) => {
      console.log("messageUser() error:" + err.message + ". userId:" + userId);
    });
};

const queueContainsMessage = (username, message) => {
  return queue.some((queuedMessage) => {
    return (
      queuedMessage.username === username && queuedMessage.message === message
    );
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

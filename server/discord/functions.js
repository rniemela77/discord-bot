const { client } = require("./index.js");

exports.messageUser = async (userId, message) => {
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

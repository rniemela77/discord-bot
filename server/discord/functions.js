const { client } = require("./index.js");

exports.messageUser = async (userId, message) => {
  const user = await client.users.fetch(userId);
  user.send(message);
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

const axios = require("axios");

module.exports = function (client, prefix) {
  client.on("messageCreate", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    // if (command === "textme") {
    //   const phoneNumber = args[0];
    //   const atMinute = args[1];
    //   const withMsg = args[2];

    //   message.reply(
    //     `I will text ${phoneNumber} "${withMsg}" at ${atMinute} minutes.`
    //   );

    //   textQueue.push({
    //     phoneNumber: `+1${phoneNumber}`,
    //     time: atMinute,
    //     msg: withMsg,
    //   });
    // }
    if (command === "gettasks") {
      axios
        .get("http://localhost:3000/api/tasks")
        .then(function (response) {
          console.log(response.data);

          // convert array of objects into single string
          let tasks = "";
          response.data.forEach((a) => {
            // render each key value pair in object
            for (let key in a) {
              tasks += `[${key}: ${a[key]}]`;
            }
          });

          message.reply(tasks);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // if (command === "addtask") {
    //   const task = args.join(" ");

    //   console.log("POSTING TASK");

    //   router.post("/", async (req, res) => {
    //     console.log("POSTING TASK");
    //     await axios.post("/api/tasks", {
    //       task6: task,
    //     });
    //     console.log("POSTED");
    //     res.status(201).send();
    //   });

    //   console.log("posted?");

    //   message.reply(`Added task: ${task}`);
    // } else
    if (command === "ping") {
      const timeTaken = Date.now() - message.createdTimestamp;
      message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    } else if (command === "sum") {
      const numArgs = args.map((x) => parseFloat(x));
      const sum = numArgs.reduce((counter, x) => (counter += x));
      message.reply(`The sum of all the arguments you provided is ${sum}!`);
    }
  });

  console.log("bot commands finished");
};

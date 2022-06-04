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
    // Get tasks
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
    // Add task
    else if (command === "addtask") {
      let newTask = {};

      // Parse arguments into object
      let taskKey = args.join(" ").split("[").join("").split("]");
      newTask[taskKey[0]] = taskKey[1].trim();

      axios.post("http://localhost:3000/api/tasks", newTask).then(
        (response) => {
          console.log(response);
          message.reply("Task added.");
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (command === "ping") {
      const timeTaken = Date.now() - message.createdTimestamp;
      message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    } else if (command === "sum") {
      const numArgs = args.map((x) => parseFloat(x));
      const sum = numArgs.reduce((counter, x) => (counter += x));
      message.reply(`The sum of all the arguments you provided is ${sum}!`);
    }
  });
};

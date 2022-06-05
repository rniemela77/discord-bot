const axios = require("axios");

const production = "https://supporting.herokuapp.com";
const development = "http://localhost:" + process.env.PORT;

const BASE_URL =
  process.env.NODE_ENV === "production" ? production : development;

const API_URL = `${BASE_URL}/api/tasks`;

module.exports = function (client, prefix) {
  client.on("messageCreate", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    // Get tasks
    if (command === "gettasks") {
      axios
        .get(API_URL)
        .then(function (response) {
          // convert array of objects into single string
          let tasks = "";
          response.data.forEach((a) => {
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
      // Parse arguments to create a task object
      let newTask = {};
      let taskKey = args.join(" ").split("[").join("").split("]");
      newTask[taskKey[0]] = taskKey[1].trim();

      // Send task object to server
      axios.post(API_URL, newTask).then(
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

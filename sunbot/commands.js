const endpoints = require("../server/axios");

module.exports = function (client, prefix) {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    // Get tasks
    if (command === "gettasks") {
      const tasks = await endpoints
        .getTasks()
        .then((res) => {
          return res;
        })
        .catch(() => {
          return "There was an error getting the tasks.";
        });

      message.reply(tasks);
    }
    // Add task
    else if (command === "addtask") {
      // Parse arguments to create a task object
      let taskKey = args.join(" ").split("[").join("").split("]");

      let newTask = {};
      newTask[taskKey[0]] = taskKey[1].trim();

      const success = await endpoints.addTask(newTask).then((res) => {
        return res;
      });

      if (success) {
        message.reply("Task added.");
      } else {
        message.reply("There was an error adding the task.");
      }
    }
    // Ping
    else if (command === "ping") {
      const timeTaken = Date.now() - message.createdTimestamp;
      message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
    // Sum
    else if (command === "sum") {
      const numArgs = args.map((x) => parseFloat(x));
      const sum = numArgs.reduce((counter, x) => (counter += x));
      message.reply(`The sum of all the arguments you provided is ${sum}!`);
    }
  });
};

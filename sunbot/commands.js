const taskApi = require("../server/axios");

module.exports = function (client, prefix) {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();
    if (command === "help") {
      message.reply(
        "`!help` - Shows this message.\n`!addtask [task name] task description` - Add a task. | eg: !addtask [study math] spend one hour studying\n`!gettasks` - Shows all tasks."
      );
    }

    // Get tasks
    else if (command === "gettasks") {
      const tasks = await taskApi
        .getTasks()
        .then((res) => {
          // return each task as a string
          let str = "";
          res.forEach((task) => {
            str += `${task.name} - ${task.description} @ ${task.date} ${task.time}\n`;
          });
          return str;
        })
        .catch(() => {
          return "There was an error getting the tasks.";
        });

      message.reply(tasks);
    }

    // Add task
    else if (command === "addtask") {
      // Parse arguments to create a task object
      const argsSplit = args.join(" ").split("[").join("").split("]");
      const task = {
        name: argsSplit[0],
        description: argsSplit[1],
      };

      if (!task.name || !task.description || argsSplit.length !== 2) {
        message.reply(
          "Invalid command. Example: `!addtask [cold shower] take a cold shower`"
        );
        return;
      }

      const apiResponse = await taskApi
        .addTask(task)
        .then((res) => {
          return "Task added.";
        })

        .catch((error) => {
          return `There was an error adding the task. ${error}`;
        });

      message.reply(apiResponse);
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
    } else {
      message.reply('Invalid command. Type "!help" for a list of commands.');
    }
  });
};

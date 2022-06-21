const planApi = require("../axios");
const { client, prefix } = require("./index.js");

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "help") {
    message.reply(
      "`!help` - Shows this message.\n`!addplan [plan name] plan description` - Add a plan. | eg: !addplan [study math] spend one hour studying\n`!getplans` - Shows all plans."
    );
  }
  // Get user ID
  else if (command === "userid") {
    message.author.send(`Your User ID is \n\`${message.author.id}\``);
  }
  // Get plans
  else if (command === "getplans") {
    const plans = await planApi
      .getPlans()
      .then((res) => {
        // return each plan as a string
        let str = "";
        res.forEach((plan) => {
          str += `${plan.name} - ${plan.description} @ ${plan.date} ${plan.time}\n`;
        });
        return str;
      })
      .catch(() => {
        return "There was an error getting the plans.";
      });

    message.reply(plans);
  }

  // Add plan
  else if (command === "addplan") {
    // Parse arguments to create a plan object
    const argsSplit = args.join(" ").split("[").join("").split("]");
    const plan = {
      name: argsSplit[0],
      description: argsSplit[1],
    };

    if (!plan.name || !plan.description || argsSplit.length !== 2) {
      message.reply(
        "Invalid command. Example: `!addplan [cold shower] take a cold shower`"
      );
      return;
    }

    const apiResponse = await planApi
      .addPlan(plan)
      .then((res) => {
        return "Plan added.";
      })

      .catch((error) => {
        return `There was an error adding the plan. ${error}`;
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

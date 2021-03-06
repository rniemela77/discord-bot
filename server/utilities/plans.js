const { client } = require("../discord/index.js");
const { plans } = require("../../database/plans.js");
const { getCurrentDate, getCurrentTime } = require("./helpers.js");
const { messageUser } = require("../discord/functions.js");
const { getDiscordIdFromUsername, isUserAwake } = require("./users.js");
const { SITE_URL } = process.env;
const { queue } = require("../../database/messages.js");
const { id } = require("../../database/plans.js");

exports.intervalMinutes = 10;

// TODO make 10 min based on variable elsewhere. (used in /api/plans.js too)
const intervalSpeed = 1000 * 60 * this.intervalMinutes; // 10 min

client.on("ready", async () => {
  setInterval(() => {
    plans.forEach((plan) => {
      isReminderReady(plan);
    });
    queue.forEach((message) => {
      isMessageReady(message);
    });
  }, intervalSpeed);
});

isMessageReady = async (queuedMessage) => {
  const { username, message } = queuedMessage;
  const currentTime = getCurrentTime();

  // get user's discord id, and wakeTime
  const userDiscordId = getDiscordIdFromUsername(username);

  if (!isUserAwake(username, currentTime)) {
    console.log(username, "is asleep");
    return;
  }

  console.log("sending to", username);
  await messageUser(userDiscordId, message);
  queue.splice(queue.indexOf(queuedMessage), 1);
};

isReminderReady = (plan) => {
  const { reminders } = plan;
  const currentTime = getCurrentTime();
  const currentDate = getCurrentDate();

  if (plan.dueDate !== currentDate) return;

  // check if reminder is ready
  reminders.forEach((reminder) => {
    if (reminder.time <= currentTime && !reminder.sent) {
      const userDiscordId = getDiscordIdFromUsername(plan.createdBy);

      let message = `[Reminder] ${reminder.name} @ ${currentTime}\n`;
      message += `${SITE_URL}`;

      messageUser(userDiscordId, message);
      reminder.sent = true;
    }
  });
};

exports.createEmptyPlan = (username) => {
  const newPlan = {
    id: id.number + 1,
    createdAtDate: getCurrentDate(),
    createdAtTime: getCurrentTime(),
    dueDate: getCurrentDate(), // make end of day
    dueTime: getCurrentTime(), // make end of day
    createdBy: username,
    watchers: [],
    tasks: [{ name: "", times: [""], completed: false }],
    conclusion: "",
    reminders: [],
  };

  id.number + 1;

  return newPlan;
};
/*
const isPlanDue = (plan) => {
  if (plan.date === getCurrentDate() && plan.time === getCurrentTime())
    return true;

  return false;
};

const checkIfDue = async (plan) => {
  if (!isPlanDue(plan) || plan.notified) return false;

  const { name, description, watchedBy, createdBy, id } = plan;

  const discordUserId = getDiscordIdFromUsername(createdBy);

  // Get list of users who have watched the plan
  const watchedByString = listStrings(watchedBy);
  const isOrAre = watchedBy.length > 1 ? "are" : "is";
  const isAwaitingMsg =
    watchedBy.length > 0
      ? `\n${watchedByString} ${isOrAre} awaiting your status update at the link below.`
      : "Complete the plan by clicking the link below.";

  // Get plan link
  const siteUrl = process.env.SITE_URL;
  const planLink = `${siteUrl}/plan/${id}`;

  // Format message
  let message = "";
  message += `Hey ${createdBy}! How did this plan go?\n`;
  message += `\`\`\`ini\n`;
  message += `[${name}]\n${description}\n`;
  message += `\n\`\`\``;
  message += `${isAwaitingMsg}\n${planLink}`;

  // Send private message to user
  await messageUser(discordUserId, message);

  // set plan notified to true, so we don't send them a message again
  plan.notified = true;
};

exports.notifyWatchers = async (plan) => {
  // Get the discord IDs for all the plan watchers
  let watcherIds = [];
  plan.watchedBy.forEach((watcher) => {
    const discordUserId = getDiscordIdFromUsername(watcher);
    watcherIds.push(discordUserId);
  });

  // Message all watchers
  await Promise.all(
    watcherIds.map(async (watcherId) => {
      let msg = "";
      msg += `${plan.createdBy} has a status update on their plan`;
      msg += `\`\`\`ini\n`;
      msg += `[${plan.name}]\n${plan.description}\n[${plan.createdBy}]: "${plan.conclusion}"`;
      msg += `\n\`\`\``;
      msg += `Give them feedback with the command: \`\`!t${plan.id} let's go!!!\`\``;

      await messageUser(watcherId, msg);
    })
  );
};
*/

const { client } = require("../discord/index.js");
const taskList = require("../../database/tasks.js");
const { getCurrentDate, getCurrentTime, listStrings } = require("./helpers.js");
const { messageUser } = require("../discord/functions.js");
const { getDiscordIdFromUsername } = require("./users.js");

client.on("ready", async () => {
  setInterval(() => {
    taskList.tasks.forEach((task) => {
      checkIfDue(task);
    });
  }, 3000);
});

const isTaskDue = (task) => {
  if (task.date === getCurrentDate() && task.time === getCurrentTime())
    return true;

  return false;
};

const checkIfDue = async (task) => {
  if (!isTaskDue(task) || task.notified) return false;

  const { name, description, watchedBy, createdBy, id } = task;

  const discordUserId = getDiscordIdFromUsername(createdBy);

  // Get list of users who have watched the task
  const watchedByString = listStrings(watchedBy);
  const isOrAre = watchedBy.length > 1 ? "are" : "is";
  const isAwaitingMsg =
    watchedBy.length > 0
      ? `\n${watchedByString} ${isOrAre} awaiting your status update at the link below.`
      : "Complete the task by clicking the link below.";

  // Get task link
  const siteUrl = process.env.SITE_URL;
  const taskLink = `${siteUrl}/task/${id}`;

  // Format message
  let message = "";
  message += `Hey ${createdBy}! How did this task go?\n`;
  message += `\`\`\`ini\n`;
  message += `[${name}]\n${description}\n`;
  message += `\n\`\`\``;
  message += `${isAwaitingMsg}\n${taskLink}`;

  // Send private message to user
  await messageUser(discordUserId, message);

  // set task notified to true, so we don't send them a message again
  task.notified = true;
};

exports.notifyWatchers = async (task) => {
  // Get the discord IDs for all the task watchers
  let watcherIds = [];
  task.watchedBy.forEach((watcher) => {
    const discordUserId = getDiscordIdFromUsername(watcher);
    watcherIds.push(discordUserId);
  });

  // Message all watchers
  await Promise.all(
    watcherIds.map(async (watcherId) => {
      let msg = "";
      msg += `${task.createdBy} has a status update on their task`;
      msg += `\`\`\`ini\n`;
      msg += `[${task.name}]\n${task.description}\n[${task.createdBy}]: "${task.conclusion}"`;
      msg += `\n\`\`\``;
      msg += `Give them feedback with the command: \`\`!t${task.id} let's go!!!\`\``;

      await messageUser(watcherId, msg);
    })
  );
};

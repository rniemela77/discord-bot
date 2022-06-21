const { client } = require("../discord/index.js");
const planList = require("../../database/plans.js");
const { getCurrentDate, getCurrentTime, listStrings } = require("./helpers.js");
const { messageUser } = require("../discord/functions.js");
const { getDiscordIdFromUsername } = require("./users.js");

client.on("ready", async () => {
  setInterval(() => {
    planList.plans.forEach((plan) => {
      checkIfDue(plan);
    });
  }, 3000);
});

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

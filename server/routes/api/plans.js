const express = require("express");
const router = express.Router();
const { getDiscordIdFromUsername } = require("../../utilities/users");
const { messageUser } = require("../../discord/functions.js");
const { plans } = require("../../../database/plans.js");
const { users } = require("../../../database/users.js");
const SITE_URL = process.env.SITE_URL;
const {
  getCurrentDate,
  roundTimeToMinutes,
} = require("../../utilities/helpers.js");
const {
  intervalMinutes,
  createEmptyPlan,
} = require("../../utilities/plans.js");

// Get all plans FOR user
router.get("/", async (req, res) => {
  const { user } = req.query;

  // If user does not exist in DB, return error
  if (!users.find((u) => u.username === user)) {
    return res.status(400).send("User does not exist");
  }

  // If this user has no plan for today, create a new plan and push it to the DB
  if (
    !plans.find((p) => {
      p.dueDate === getCurrentDate() && p.createdBy === user;
    })
  ) {
    const newPlan = createEmptyPlan(user);
    plans.push(newPlan);
  }

  // return plans created by the user, or watched by the user
  const userPlans = plans.filter((plan) => {
    return (
      plan.createdBy === user ||
      plan.watchers.find((watcher) => watcher.name === user)
    );
  });

  res.status(200).send(userPlans);
});

// Add/Edit Plan
router.post("/", async (req, res) => {
  console.log("adding...");

  // Only return tasks that have a name
  const filteredTasks = req.body.tasks.filter((task) => task.name);
  const trimmedTasks = filteredTasks.map((task, index) => {
    return {
      id: index,
      name: task.name.trim(),
      times: task.times,
      completed: task.completed,
    };
  });

  // Only return reminders with name and time
  const filteredReminders = req.body.reminders.filter(
    (reminder) => reminder.name && reminder.time
  );
  const roundedReminders = filteredReminders.map((reminder, index) => {
    return {
      id: index,
      name: reminder.name.trim(),
      time: roundTimeToMinutes(intervalMinutes, reminder.time),
      sent: reminder.sent,
    };
  });

  // Create the updated plan
  const updatedPlan = {
    id: req.body.id,
    createdAtDate: req.body.createdAtDate,
    createdAtTime: req.body.createdAtTime,
    dueDate: req.body.createdAtDate, //todo fix
    dueTime: req.body.createdAtTime, //todo fix
    createdBy: req.body.createdBy,
    watchers: req.body.watchers,
    tasks: trimmedTasks,
    conclusion: "",
    reminders: roundedReminders,
  };

  // Replace plan in DB with updated plan
  const index = plans.findIndex((plan) => plan.id === updatedPlan.id);
  plans[index] = updatedPlan;

  res.status(201).send("Task added successfully.");

  // Message all watchers
  const createdByFirstName = users.find(
    (user) => user.username === updatedPlan.createdBy
  ).firstName;

  let message = "**Plan** ";
  message += `${createdByFirstName} set their plan for today.\n`;
  message += `\`\`\`ini\n`;
  message += `${updatedPlan.tasks.map((task) => task.name).join(", ")}\n`;
  message += `\n\`\`\``;
  message += `Visit ${SITE_URL} to support them!`;

  await Promise.all(
    updatedPlan.watchers.map(async (username) => {
      const discordId = getDiscordIdFromUsername(username);

      if (discordId) {
        await messageUser(discordId, message);
      }
    })
  );
});

// Update task completed status
router.put("/:planId", async (req, res) => {
  const { planId } = req.params;
  const { taskId, isCompleted } = req.body;

  // Find plan in DB
  const plan = plans.find((plan) => plan.id === Number(planId));

  // Find task in plan
  const task = plan.tasks.find((task) => task.id === taskId);

  // Mark task as completed
  task.completed = isCompleted;

  res.status(200).send("Task updated successfully.");
});

// Set watcher message
router.put("/:planId/setwatchermessage", async (req, res) => {
  const { planId } = req.params;
  const { name, message } = req.body;

  // Find plan in DB
  const plan = plans.find((plan) => plan.id === Number(planId));

  // Find watcher in plan
  const watcherIndex = plan.watchers.findIndex(
    (watcher) => watcher.name === name
  );

  // Set watcher message in plan
  plan.watchers[watcherIndex].message = message;

  res.status(200).send("Watcher message updated successfully.");
});

module.exports = router;

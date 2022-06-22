const express = require("express");
const router = express.Router();
const discordWebhook = require("../../discord/webhook");
const { getDiscordIdFromUsername } = require("../../utilities/users");
const { messageUser } = require("../../discord/functions.js");
const { plans, id } = require("../../../database/plans.js");
const { users } = require("../../../database/users.js");
const { notifyWatchers } = require("../../utilities/plans");
const SITE_URL = process.env.SITE_URL;
const {
  getCurrentDate,
  getCurrentTime,
  roundTimeToMinutes,
} = require("../../utilities/helpers.js");

// Get all plans FOR user
router.get("/", async (req, res) => {
  const { user } = req.query;

  // If user does not exist in DB, return error
  if (!users.find((u) => u.username === user)) {
    return res.status(400).send("User does not exist");
  }

  // Return plans created by user, and plans watched by user
  let plansForUser = {};
  plansForUser.plans = plans.filter((plan) => plan.createdBy === user);
  plansForUser.watching = plans.filter((plan) => plan.watchedBy.includes(user));
  plansForUser.today = plans.find(
    (plan) => plan.createdAtDate === getCurrentDate() && plan.createdBy === user
  );

  // If there is no plan for today, create a new plan
  if (!plansForUser.today) {
    const newPlan = {
      id: id.number + 1,
      createdAtDate: getCurrentDate(),
      createdAtTime: getCurrentTime(),
      dueDate: getCurrentDate(), // make end of day
      dueTime: getCurrentTime(), // make end of day
      createdBy: user,
      watchedBy: [],
      tasks: [{ name: "", times: [""], completed: false }],
      conclusion: "",
      reminders: [],
    };
    plans.push(newPlan);
    id.number + 1;

    plansForUser.today = newPlan;
  }

  res.status(200).send(plansForUser);
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

  //Only return reminders with name and time
  const filteredReminders = req.body.reminders.filter(
    (reminder) => reminder.name && reminder.time
  );
  const roundedReminders = filteredReminders.map((reminder, index) => {
    return {
      id: index,
      name: reminder.name.trim(),
      time: roundTimeToMinutes(10, reminder.time),
      sent: reminder.sent,
    };
  });

  const updatedPlan = {
    id: req.body.id,
    createdAtDate: req.body.createdAtDate,
    createdAtTime: req.body.createdAtTime,
    dueDate: req.body.createdAtDate, //todo fix
    dueTime: req.body.createdAtTime, //todo fix
    createdBy: req.body.createdBy,
    watchedBy: req.body.watchedBy,
    tasks: trimmedTasks,
    conclusion: "",
    reminders: roundedReminders,
  };

  const createdByFirstName = users.find(
    (user) => user.username === updatedPlan.createdBy
  ).firstName;

  // Replace plan in DB with updated plan
  const index = plans.findIndex((plan) => plan.id === updatedPlan.id);
  plans[index] = updatedPlan;

  res.status(201).send("Task added successfully.");

  // Message all watchers
  let message = "**Plan** ";
  message += `${createdByFirstName} updated their plan for today.\n`;
  message += `\`\`\`ini\n`;
  message += `${updatedPlan.tasks.map((task) => task.name).join(", ")}\n`;
  message += `\n\`\`\``;
  message += `Visit ${SITE_URL} to support them!`;

  await Promise.all(
    updatedPlan.watchedBy.map(async (username) => {
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
  console.log(req.body);

  // Find plan in DB
  const plan = plans.find((plan) => plan.id === Number(planId));

  // Find task in plan
  const task = plan.tasks.find((task) => task.id === taskId);

  // Update task completed status
  task.completed = isCompleted;

  res.status(200).send("Task updated successfully.");

  plan.tasks.forEach((task) => {
    console.log(task);
  });
});

// Get tasks watched by username
// router.get("/watchedBy/:username", (req, res) => {
//   const tasks = plans.tasks.filter((task) => {
//     return task.watchedBy.includes(req.params.username);
//   });

//   if (tasks.length < 1) return res.status(200).send([]);

//   res.status(200).send(tasks);
// });

// Set task status
// router.post("/complete/:id", (req, res) => {
//   const taskId = req.params.id;
//   const conclusion = req.body;

//   // Get task by id
//   const task = plans.tasks.find((task) => task.id.toString() === taskId);

//   if (!task) return res.status(404).send("Task not found");

//   // add the task to the due list with the added status
//   task.conclusion = conclusion.text;

//   notifyWatchers(task);

//   res.status(200).send("Task completed");
// });

// router.delete(
//   "/:id",
//   (req, res) => {
//     const id = req.params.id;
//     plans.tasks = plans.tasks.filter((task) => task.id.toString() !== id);

//     res.status(200).send("Task deleted");
//   },
//   (err) => {
//     console.log(err);
//   }
// );

module.exports = router;

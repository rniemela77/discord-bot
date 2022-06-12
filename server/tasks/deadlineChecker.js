const taskList = require("./db");

const discordWebhook = require("../discord/webhook");

const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

// Get date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  const currentDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];
  return currentDate;
};

// Get time in HH:MM format
const getCurrentTime = () => {
  const date = new Date();
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  const currentTime = `${hours}:${minutes}`;

  return currentTime;
};

// every minute, check if the task is due. If so, notify the user.
setInterval(() => {
  taskList.data.forEach((task) => {
    if (
      task.date === getCurrentDate() &&
      task.time === getCurrentTime() &&
      !task.completed
    ) {
      // set task as completed
      task.completed = true;
      discordWebhook.notifyDeadline(task);
    }
  });
}, 60000);

const taskList = require("./db");

const axios = require("axios");

const url = process.env.DISCORD_WEBHOOK_URL;

const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

const notifyDeadline = (task) => {
  axios.post(url, {
    content: `Task due: ${task.name} - ${task.description} @ ${task.date} - ${task.time}`,
  });
};

// every minute, check if the task is due
setInterval(() => {
  taskList.data.forEach((task) => {
    const date = new Date();
    const currentDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    const currentTime = `${date.getHours()}:${addZero(date.getMinutes())}`;

    if (
      task.date === currentDate &&
      task.time === currentTime &&
      !task.completed
    ) {
      // make task completed
      task.completed = true;
      notifyDeadline(task);
    }
  });
}, 5000);

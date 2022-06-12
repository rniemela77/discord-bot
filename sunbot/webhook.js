const axios = require("axios");

const url = process.env.DISCORD_WEBHOOK_URL;

// Send message to discord channel saying task was created
const taskAdded = (task) => {
  const { name, description, date, time, createdBy } = task;

  const message = `Task added: ${name} - ${description} @ ${date} - ${time} - ${createdBy}`;

  axios.post(url, {
    content: message,
  });
};

// Send message to discord channel saying task was completed
const notifyDeadline = (task) => {
  const { name, description, date, time, createdBy } = task;

  const message = `Task due: ${name} - ${description} @ ${date} - ${time} - ${createdBy}`;

  axios.post(url, {
    content: message,
  });
};

exports.taskAdded = taskAdded;
exports.notifyDeadline = notifyDeadline;

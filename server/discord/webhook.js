const axios = require("axios");

const url = process.env.DISCORD_WEBHOOK_URL;

// Send message to discord channel saying plan was created
const planAdded = (plan) => {
  const { name, description, date, time, createdBy } = plan;

  const message = `Plan added: ${name} - ${description} @ ${date} - ${time} - ${createdBy}`;

  axios.post(url, {
    content: message,
  });
};

// Send message to discord channel saying plan was completed
const notifyDeadline = (plan) => {
  const { name, description, date, time, createdBy } = plan;

  const message = `Plan due: ${name} - ${description} @ ${date} - ${time} - ${createdBy}`;

  axios.post(url, {
    content: message,
  });
};

exports.planAdded = planAdded;
exports.notifyDeadline = notifyDeadline;

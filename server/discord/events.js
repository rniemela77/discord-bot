const taskList = require("../../database/tasks.js");
const userList = require("../../database/users.js");

module.exports = function (client, channelId) {
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

  const checkForDeadlines = () => {
    taskList.data.forEach((task) => {
      if (
        task.date === getCurrentDate() &&
        task.time === getCurrentTime() &&
        !task.completed
      ) {
        const { name, description, watchedBy, createdBy } = task;

        const discordUserId = userList.users.find(
          (u) => u.username === createdBy
        ).discordUserId;

        const message = `Hey [${createdBy}]! Your followers want to know how the task went.\`\`\`ini\n[${name}]\n${description}\nWatchers: ${watchedBy}\n\`\`\`Visit https://www.localhost:3000/ to share your results.`;

        client.users
          .fetch(discordUserId)
          .then((user) => {
            user.send(message);
            task.completed = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  client.on("ready", () => {
    setInterval(checkForDeadlines, 3000);
  });

  return module;
};

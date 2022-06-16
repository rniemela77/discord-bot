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

  function listStrings(arr) {
    if (arr.length <= 1) {
      return `[${arr[0]}]`;
    }
    return `[${arr.slice(0, arr.length - 1).join(", ")}] and [${
      arr[arr.length - 1]
    }]`;
  }

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

        // comma separated list of users watching task plus and
        const watchedByString = listStrings(watchedBy);

        const isOrAre = watchedBy.length > 1 ? "are" : "is";

        const message = `\`\`\`ini\nHey [${createdBy}]! How did this task go?\n\n[${name}] ${description}\n\n${watchedByString} ${isOrAre} awaiting your status update at the link below.\n\`\`\`\nhttps://www.localhost:3000/`;

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

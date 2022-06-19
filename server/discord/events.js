const tasks = require("../../database/tasks.js");
const userList = require("../../database/users.js");
const { client } = require("./index.js");

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
  return `[${arr.slice(0, arr.length - 1).join("], [")}], and [${
    arr[arr.length - 1]
  }]`;
}

const checkForDeadlines = () => {
  tasks.todo.forEach((task) => {
    if (task.date === getCurrentDate() && task.time === getCurrentTime()) {
      const { name, description, watchedBy, createdBy, id } = task;

      // Get the user's discord ID so we can PM them
      const discordUserId = userList.users.find(
        (u) => u.username === createdBy
      ).discordUserId;

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
      const message = `\`\`\`ini\nHey [${createdBy}]! How did this task go?\n\n[${name}] ${description}\n${isAwaitingMsg}\n\`\`\`\n${taskLink}`;

      // Move task from todo to ready
      tasks.ready.push(task);
      tasks.todo.splice(tasks.todo.indexOf(task), 1);

      // Send private message to user
      client.users
        .fetch(discordUserId)
        .then((user) => {
          user.send(message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

const checkForStatus = () => {
  tasks.ready.forEach((task) => {
    // Get the user's discord ID so we can PM them
    const discordUserId = userList.users.find(
      (u) => u.username === task.createdBy
    ).discordUserId;

    // Get all task watchers and their discord IDs
    let watchers = [];
    task.watchedBy.forEach((watcher) => {
      watchers.push({
        username: watcher,
        discordUserId: userList.users.find((u) => u.username === watcher)
          .discordUserId,
      });
    });

    // Move task from ready to done
    tasks.done.push(task);
    tasks.ready = tasks.ready.filter((t) => t.id !== task.id);

    // send a message to each watcher
    watchers.forEach((watcher) => {
      client.users
        .fetch(watcher.discordUserId)
        .then((user) => {
          user.send(
            `\`\`\`ini\nHey [${watcher.username}], we have received an update on [${task.createdBy}]'s task:\n\n[${task.name}] ${task.description}\n\n"${task.status}"\n\`\`\`\nGive them feedback with the command: \`\`!t${task.id} let's go!!!\`\``
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};

client.on("ready", () => {
  setInterval(checkForDeadlines, 60000);
  setInterval(checkForStatus, 60000);
});

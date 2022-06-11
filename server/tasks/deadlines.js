const taskList = require("./db");

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// every minute, check if the task is due
setInterval(() => {
  taskList.data.forEach((task) => {
    const date = new Date();
    const currentDate = date.toISOString().split("T")[0];
    const currentTime = `${date.getHours()}:${addZero(date.getMinutes())}`;
    console.log(currentDate, currentTime);
    if (task.date === currentDate && task.time === currentTime) {
      const url = process.env.DISCORD_WEBHOOK_URL;
      axios.post(url, {
        content: `Task due: ${task.name} - ${task.description} @ ${task.date} - ${task.time}`,
      });
      // send a message to the channel
      console.log(`${task.name} is due!`);
    }
    // check if the task is past due
    else if (task.date < currentDate) {
      console.log(`${task.name} is overdue!`);
    }
  });
}, 60000);

exports.addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

// Round HH:MM time to the nearest X minutes
exports.roundTimeToMinutes = (roundingTo, time) => {
  const timeArray = time.split(":");
  let hour = parseInt(timeArray[0]); // 23 -> 00
  let minute = parseInt(timeArray[1]); // 59 -> 00

  // Round minute to nearest X minutes
  minute = Math.round(minute / roundingTo) * roundingTo;

  // If minute is 60, add 1 to hour and set minute to 0
  if (minute === 60) {
    minute = 0;
    hour += 1;
  }
  // If hour is 24, set hour to 0
  if (hour === 24) {
    hour = 0;
  }

  return `${this.addZero(hour)}:${this.addZero(minute)}`;
};

// Get date in YYYY-MM-DD format
exports.getCurrentDate = () => {
  const date = new Date();
  const currentDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];
  return currentDate;
};

// Get time in HH:MM format
exports.getCurrentTime = () => {
  const date = new Date();
  const hours = this.addZero(date.getHours());
  const minutes = this.addZero(date.getMinutes());

  const currentTime = `${hours}:${minutes}`;

  return currentTime;
};

exports.listStrings = (arr) => {
  if (arr.length <= 1) {
    return `[${arr[0]}]`;
  }
  return `[${arr.slice(0, arr.length - 1).join("], [")}], and [${
    arr[arr.length - 1]
  }]`;
};

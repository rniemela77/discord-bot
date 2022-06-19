exports.addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
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

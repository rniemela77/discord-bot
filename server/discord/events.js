module.exports = function (client, channelId) {
  let module = {};

  client.on("ready", () => {
    client.channels.cache.get(channelId).send("I am alive!");
  });

  return module;
};

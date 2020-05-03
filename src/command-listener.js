const listenToCommands = (app) => {
  app.command("/howard", async ({ command, ack, say }) => {
    await ack();
    await say(`${command.text}`);
  });
};

export default listenToCommands;

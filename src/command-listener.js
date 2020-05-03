import runCoreUpdate from "./funcs/runCoreUpdate";

const listenToCommands = (app) => {
  app.command("/howard", async ({ command, ack, say }) => {
    await ack();
    const response = await runCoreUpdate();
    await say(response);
  });
};

export default listenToCommands;

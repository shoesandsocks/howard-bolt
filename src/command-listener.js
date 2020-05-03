import runCoreUpdate from "./funcs/runCoreUpdate";

const listenToCommands = (app) => {
  app.command("/howard", async ({ command, ack, say }) => {
    await ack();
    const response = await runCoreUpdate();
    console.log(response);
    await say(JSON.stringify(response));
  });
};

export default listenToCommands;

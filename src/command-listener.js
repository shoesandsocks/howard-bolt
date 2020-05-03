import handleUpdateRequest from "./funcs/runCoreUpdate";

const listenToCommands = (app) => {
  app.command("/howard", async ({ command, ack, say, respond }) => {
    await ack();
    switch (command.text) {
      case "update":
        return handleUpdateRequest(say, respond);
      case "hi":
        return say("bok bok. hi.");
      default:
        await say(
          `I only know "update" right now; I don't know what to do with "${command.text}".`
        );
    }
  });
};

export default listenToCommands;

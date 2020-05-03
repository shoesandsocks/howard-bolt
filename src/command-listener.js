import runCoreUpdate from "./funcs/runCoreUpdate";

const makeMessage = (results) => {
  const { newQuotes, depQuotes } = results;
  console.log(depQuotes);
  const template = {
    text: "Here's what I added to the database:",
  };
  template.attachments = newQuotes.map((quote) => JSON.stringify(quote));
  return template;
};

const listenToCommands = (app) => {
  app.command("/howard", async ({ command, ack, say }) => {
    await ack();
    if (command.text === "update") {
      const response = await runCoreUpdate();
      console.log(response.results, response.error);
      if (response.error) {
        await say("something went wrong");
      }
      if (response.results) {
        const message = makeMessage(response.results);
        await say(message);
      }
    } else {
      await say(
        `I only know "update" right now; I can't parse ${command.text}`
      );
    }
  });
};

export default listenToCommands;

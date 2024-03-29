import handleUpdateRequest from "./funcs/runCoreUpdate.js";
import makeMarkov from "./funcs/markov.js";

const listenToCommands = (app) => {
  app.command("/howard", async (props) => {
    // console.log(Object.keys(props));
    // console.log(props.payload);
    const { command, ack, say, respond, payload } = props;
    const { channel_id, response_url } = payload;
    await ack();
    switch (command.text) {
      case "update":
        return handleUpdateRequest(say, respond, channel_id, response_url);
      case "hi":
        return say("bok bok. hi.");
      case "markov":
        const response = await makeMarkov();
        return say(response);
      default:
        await say(
          `I only know "update" right now; I don't know what to do with "${command.text}".`
        );
    }
  });
};

export default listenToCommands;

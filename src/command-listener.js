import handleUpdateRequest from "./funcs/runCoreUpdate";

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
      default:
        await say(
          `I only know "update" right now; I don't know what to do with "${command.text}".`
        );
    }
  });
};

export default listenToCommands;

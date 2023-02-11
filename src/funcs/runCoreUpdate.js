import fetch from "node-fetch";
import url from "./config.js";

const coreUrl = `${url}/core`;

const runCoreUpdate = () =>
  fetch(coreUrl)
    .then((response) => response.json())
    .catch(() => {
      error: "boope";
    });

const makeMessage = (results, response_url) => {
  const { newQuotes, depQuotes } = results;
  const template = {
    response_url,
    response_type: "in_channel",
    text: "Nothing new to add to the database",
  };
  console.log(depQuotes);
  if (newQuotes.length === 0) {
    return template;
  }
  template.text = "Here's what I added to the database:";
  template.attachments = newQuotes.map((quote) => ({
    text: JSON.stringify(quote),
  }));
  return template;
};

// imported as handleUpdateRequest by the command-listener. (/howard update)
export default async (say, respond, channel_id, response_url) => {
  const response = await runCoreUpdate();
  if (response.error) {
    await say("something went wrong");
  }
  if (response.results) {
    await respond(makeMessage(response.results, response_url));
  }
};

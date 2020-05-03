import fetch from "node-fetch";

const url = "https://howardchicken.online/howard/core";

const runCoreUpdate = () =>
  fetch(url)
    .then((response) => response.json())
    .catch(() => {
      error: "boope";
    });

const makeMessage = (results) => {
  const { newQuotes, depQuotes } = results;
  const template = {
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
export default async (say, respond) => {
  const response = await runCoreUpdate();
  if (response.error) {
    await say("something went wrong");
  }
  if (response.results) {
    await respond(makeMessage(response.results));
  }
};

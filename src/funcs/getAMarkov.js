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
export default async (respond, response_url) => {
  const response = await markov();
  await respond(makeMessage(response, response_url));
};

import cron from "node-cron";

import { getHowardsReply } from "./funcs/searches";
import store from "./store";
import makeMP3 from "./funcs/phraseToMP3";

require("dotenv").config();

const runJobs = (app) => {
  // Friday noon
  cron.schedule("0 12 * * 5", async () => {
    const quote = await getHowardsReply({ query: "getQuotes", argument: 1 });
    const postIt = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: store.getChannel(),
      text: quote,
    });
  });

  // temporary dev job
  cron.schedule("25 * * * 0-6", async () => {
    const quote = await getHowardsReply({ query: "getQuotes", argument: 1 });
    return makeMP3(quote)
      .then((reply) => reply.json())
      .then(async (json) => {
        if (json.error) {
          return console.log(json.error);
        }
        const postIt = await app.client.chat.postMessage({
          token: process.env.SLACK_BOT_TOKEN,
          channel: store.getChannel(),
          text: json.response.filename,
        });
      })
      .catch((e) => console.log(e));
  });
};

export default runJobs;

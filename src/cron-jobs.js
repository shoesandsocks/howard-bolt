import cron from "node-cron";
import * as dotenv from "dotenv";
dotenv.config();

import { getHowardsReply } from "./funcs/searches.js";
import store from "./store.js";

// import makeMP3 from "./funcs/phraseToMP3.js";

const runJobs = (app) => {
  // Friday noon FIXME: changed to 16 from 12 inside Linode/Docker UTC
  cron.schedule("0 16 * * 5", async () => {
    const quote = await getHowardsReply({ query: "getQuotes", argument: 1 });
    const postIt = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: store.getChannel(),
      text: quote,
    });
  });

  // temporary dev job
  // FIXME: makeMP3 doesn't work unless I run ngrok on iMac
  // turning this off for now, until I can come up with
  // a Mac in the kloüd, to run DanielAsAService there
  // cron.schedule("0 13 * * 5", async () => {
  //   const quote = await getHowardsReply({ query: "getQuotes", argument: 1 });
  //   return makeMP3(quote)
  //     .then((reply) => reply.json())
  //     .then(async (json) => {
  //       if (json.error) {
  //         return console.log(json.error);
  //       }
  //       const postIt = await app.client.chat.postMessage({
  //         token: process.env.SLACK_BOT_TOKEN,
  //         channel: store.getChannel(),
  //         text: json.response.filename,
  //       });
  //     })
  //     .catch((e) => console.log(e));
  // });
};

export default runJobs;

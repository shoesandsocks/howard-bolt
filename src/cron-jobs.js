import cron from "node-cron";

import { randomQuote } from "./funcs/searches";
import store from "./store";

require("dotenv").config();

const runJobs = (app) => {
  // Friday noon
  cron.schedule("0 12 * * 5", async () => {
    const quote = await randomQuote();
    const postIt = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: store.getChannel(),
      text: quote,
    });
  });

  // temporary dev job
  cron.schedule("0,12,20,30,40,50 * * * 0-6", () => {
    console.log("mouthiness: ", store.getMouthiness());
  });
};

export default runJobs;

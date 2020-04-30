import cron from "node-cron";
import { randomQuote } from "./funcs/searches";

require("dotenv").config();

const runJobs = (app) => {
  cron.schedule("0 12 * * 5", async () => {
    const quote = await randomQuote();
    const postIt = await app.client.chat.postMessage({
      token: process.env.BOT_TOKEN,
      channel: "C0C3VLD28",
      text: quote,
    });
  });
};
export default runJobs;

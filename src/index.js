// If I move auth into this app, this is the authURL: https://slack.com/oauth/v2/authorize?client_id=11083475395.188120798310&scope=app_mentions:read,calls:read,calls:write,channels:history,channels:join,channels:read,chat:write,chat:write.customize,chat:write.public,commands,dnd:read,files:read,groups:read,im:history,im:read,im:write,incoming-webhook,mpim:history,mpim:read,mpim:write,pins:write,reactions:read,reactions:write,remote_files:read,remote_files:share,remote_files:write,team:read,users:read,users:read.email,users:write
import { App } from "@slack/bolt";

import discordApp from "./discordApp.js";

import store from "./store";
import listenToEvents from "./events-listener";
import listenToMessages from "./message-listener";
import listenToCommands from "./command-listener";
import runJobs from "./cron-jobs";

require("dotenv").config();

const port = process.env.PORT || 3000;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

listenToEvents(app, store);
listenToMessages(app, store);
listenToCommands(app);
runJobs(app, store);

(async () => {
  await app.start(port);
  // see https://glitch.com/edit/#!/slack-bolt?path=index.js%3A190%3A0
  let id = await app.client.auth
    .test({ token: process.env.SLACK_BOT_TOKEN })
    .then((result) => result.user_id)
    .catch((err) => console.log("mega-error starting howard-bolt"));
  store.setMe(id);
  console.log(`⚡️ Bolt app is running on ${port}!`);
  // https://blog.heroku.com/best-practices-nodejs-errors
  process.on("unhandledRejection", (err, promise) => {
    console.log("Unhandled rejection at ", promise, `reason: ${err.message}`);
    process.exit(1);
  });
})();

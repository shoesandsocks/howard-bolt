// If I move auth into this app, this is the authURL: https://slack.com/oauth/v2/authorize?client_id=11083475395.188120798310&scope=app_mentions:read,calls:read,calls:write,channels:history,channels:join,channels:read,chat:write,chat:write.customize,chat:write.public,commands,dnd:read,files:read,groups:read,im:history,im:read,im:write,incoming-webhook,mpim:history,mpim:read,mpim:write,pins:write,reactions:read,reactions:write,remote_files:read,remote_files:share,remote_files:write,team:read,users:read,users:read.email,users:write
import { App } from "@slack/bolt";

import listenToEvents from "./events-listener";
import listenToMessages from "./message-listener";

require("dotenv").config();

const port = process.env.PORT || 3000;

const app = new App({
  token: process.env.BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

listenToEvents(app);
listenToMessages(app);

(async () => {
  await app.start(port);
  console.log(`⚡️ Bolt app is running on ${port}!`);
})();

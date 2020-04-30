// If I move auth into this app, this is the authURL: https://slack.com/oauth/v2/authorize?client_id=11083475395.188120798310&scope=app_mentions:read,calls:read,calls:write,channels:history,channels:join,channels:read,chat:write,chat:write.customize,chat:write.public,commands,dnd:read,files:read,groups:read,im:history,im:read,im:write,incoming-webhook,mpim:history,mpim:read,mpim:write,pins:write,reactions:read,reactions:write,remote_files:read,remote_files:share,remote_files:write,team:read,users:read,users:read.email,users:write

import { App } from "@slack/bolt";

import { coinflip } from "./funcs/coinflip";
import { search, randomQuote, markov } from "./funcs/searches";

require("dotenv").config();

const app = new App({
  token: process.env.BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// from the docs' "Listener Middleware" section
async function noBotMessages({ message, next }) {
  if (!message.bot_id) {
    await next();
  }
}
async function iHeardHoward({ message, next, say }) {
  if (message.text.match(/(howard|Howard|howie|Howie|HC|chicken|Chicken)/g)) {
    console.log("i heard my name");
    const quote = await randomQuote();
    await say(quote);
  } else {
    await next();
  }
}

app.message(noBotMessages, iHeardHoward, async ({ say, message }) => {
  try {
    const { channel } = message;
    if (channel === "C61L2R7N2") {
      console.log("debug channel - always responding with markov");
      const quote = await markov(message.text);
      await say(quote);
    } else if (channel === "C3ZHJ4K9Q") {
      console.log(
        "testing channel, responding 50% of the time with random quote"
      );
      if (coinflip(50)) {
        const quote = await randomQuote();
        await say(quote);
      }
    } else if (coinflip(25)) {
      console.log(
        "not testing or debug. 25% chance of the search-func speaking"
      );
      const quote = await search(message.text);
      await say(quote);
    } else {
      console.log("eh, i'll pass.");
    }
  } catch (e) {
    console.log("here");
  }
});

app.event("app_home_opened", async ({ event, context }) => {
  console.log("ahoy");
  try {
    /* view.publish is the method that your app uses to push a view to the Home tab */
    const result = await app.client.views.publish({
      token: context.botToken,
      user_id: event.user,
      view: {
        type: "home",
        callback_id: "home_view",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Welcome to your _App's Home_* :tada:",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "This button won't do much.",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Click me!",
                },
              },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

const port = process.env.PORT || 3000;

(async () => {
  await app.start(port);
  console.log(`⚡️ Bolt app is running on ${port}!`);
})();

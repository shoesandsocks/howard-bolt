// If I move auth into this app, this is the authURL: https://slack.com/oauth/v2/authorize?client_id=11083475395.188120798310&scope=app_mentions:read,calls:read,calls:write,channels:history,channels:join,channels:read,chat:write,chat:write.customize,chat:write.public,commands,dnd:read,files:read,groups:read,im:history,im:read,im:write,incoming-webhook,mpim:history,mpim:read,mpim:write,pins:write,reactions:read,reactions:write,remote_files:read,remote_files:share,remote_files:write,team:read,users:read,users:read.email,users:write

import { App } from "@slack/bolt";

import { howard } from "./funcs/howard";
import { coinflip } from "./funcs/coinflip";

require("dotenv").config();

const rnd = (arr) => Math.floor(Math.random() * arr.length);

const app = new App({
  token: process.env.BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// const botParams = {
//   icon_emoji: ':howard:',
// };

const randomQuote = () =>
  howard("getQuotes", 1)
    .then((reply) => reply[0].text)
    .catch(() => "failboat. :(");

const search = (textToSearch) =>
  howard("searchQuotes", textToSearch)
    .then((reply) => {
      return Array.isArray(reply) && reply.length > 0
        ? reply[rnd(reply)].text
        : randomQuote();
    })
    .catch(() => randomQuote());

const markov = (text) =>
  howard("getMarkov", text)
    .then((reply) => reply)
    .catch(() => "markov");

// from the docs' "Listener Middleware" section
async function noBotMessages({ message, next }) {
  console.log(message);
  /*
   * https://github.com/slackapi/bolt/issues/465
   *
   * "As far as I know, the server-side no longer
   * sends bot_message subtyped events. Instead, it sends
   * no-subtype events with bot_id and bot_profile
   * properties. If the server-side gets back to the
   * previous behavior in the future, we may need
   * to add bot_message events as well."
   */
  // so let's change it
  // if (!message.subtype || message.subtype !== "bot_message") {
  //   await next();
  // }
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
      console.log("debug channel - always responding");
      const quote = await markov(message.text);
      await say(quote);
    } else if (channel === "C3ZHJ4K9Q") {
      console.log("testing channel, always responding random");
      const quote = await randomQuote();
      await say(quote);
    } else if (coinflip(50)) {
      const quote = await randomQuote();
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

import { coinflip } from "./funcs/coinflip";
import { getHowardsReply } from "./funcs/searches";

async function noBotMessages({ message, next }) {
  if (!message.bot_id) {
    await next();
  }
}
async function iHeardHoward({ message, next, say }) {
  if (message.text.match(/(howard|Howard|howie|Howie|HC|chicken|Chicken)/g)) {
    console.log("i heard my name");
    const quote = await getHowardsReply({ query: "getQuotes", argument: 1 });
    await say(quote[0].text); // FIXME: this is too brittle. fix at the gHR level?
  } else {
    await next();
  }
}

const listenToMessages = (app, store) => {
  app.message(noBotMessages, iHeardHoward, async ({ say, message }) => {
    try {
      const { channel } = message;
      if (channel === "C61L2R7N2") {
        console.log("debug channel - always responding with poem, for now");
        const quote = await getHowardsReply({
          query: "poetize",
          argument: message.text,
        });
        await say(quote);
      } else if (channel === "C3ZHJ4K9Q") {
        console.log(
          "testing channel, responding 50% of the time with random quote"
        );
        if (coinflip(50)) {
          const quote = await getHowardsReply({
            query: "getQuotes",
            argument: 1,
          });
          await say(quote);
        }
      } else if (coinflip(store.getMouthiness())) {
        console.log(
          `not testing or debug. ${store.getMouthiness()}% chance of the search-func speaking`
        );
        const quote = await getHowardsReply({
          query: "searchQuotes",
          argument: message.text,
        });
        // FIXME: likely to be an array, here
        await say(quote);
      } else {
        console.log("eh, i'll pass.");
      }
    } catch (e) {
      console.log("here");
    }
  });
};

export default listenToMessages;

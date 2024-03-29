import { coinflip } from "./funcs/coinflip.js";
import { queries, getHowardsReply } from "./funcs/searches.js";

async function noBotMessages({ message, next }) {
  if (!message.bot_id) {
    await next();
  }
}
async function iHeardHoward({ message, next, say }) {
  if (
    message &&
    message.text &&
    message.text.match(/(howard|Howard|howie|Howie|HC|chicken|Chicken)/g)
  ) {
    console.log("i heard my name");
    const quote = await getHowardsReply({
      query: queries.getQuotes,
      argument: 1,
    });
    await say(quote);
  } else {
    await next();
  }
}

const listenToMessages = (app, store) => {
  app.message(noBotMessages, iHeardHoward, async ({ say, message }) => {
    try {
      const { channel } = message;
      if (channel === "C61L2R7N2") {
        console.log("#debug: always responding with poem, for now");
        const quote = await getHowardsReply({
          query: queries.getPoem,
          argument: message.text,
        });
        await say(quote);
      } else if (channel === "C3ZHJ4K9Q") {
        if (coinflip(50)) {
          console.log("#testing, responding 50% of the time with random quote");
          const quote = await getHowardsReply({
            query: queries.getQuotes,
            argument: 1,
          });
          await say(quote);
        }
        console.log("#testing: coinflip failed; not responding");
      } else if (coinflip(store.getMouthiness())) {
        console.log(
          `not #testing or #debug. ${store.getMouthiness()}% chance of the search-func speaking`
        );
        const quote = await getHowardsReply({
          query: queries.searchQuotes,
          argument: message.text,
        });
        await say(quote);
      } else {
        console.log("eh, i'll pass.");
      }
    } catch (e) {
      console.log("message listener catch");
    }
  });
};

export default listenToMessages;

import { coinflip } from "./funcs/coinflip";
import { search, randomQuote, markov } from "./funcs/searches";

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

const listenToMessages = (app) => {
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
};

export default listenToMessages;
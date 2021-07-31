import Markov from "js-markov";

import { getHowardsReply } from "./searches.js";

const markov = new Markov();

const setup = async () => {
  const texties = await getHowardsReply({
    query: "getAll",
    argument: "really",
  });
  const strings = texties.map((h) => h.original.text);
  markov.addStates(strings);
  markov.train(3);
};

setTimeout(() => {
  setup();
}, 30000);

export default async () => {
  return markov.generateRandom(50);
};

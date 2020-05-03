import Markov from "js-markov";

import { getHowardsReply } from "./searches";

const markov = new Markov();

const setup = async () => {
  const texties = await getHowardsReply({
    query: "getAll",
    argument: "really",
  }).then((howardsReply) => howardsReply.map((h) => h.original.text));
  markov.addStates(texties);
  markov.train(3);
};

setup();

export default async () => {
  return markov.generateRandom(50);
};

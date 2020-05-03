import Markov from "js-markov";

import { getHowardsReply } from "./searches";

const markov = new Markov();

export default async () => {
  const texties = await getHowardsReply({
    query: "getAll",
    argument: "really",
  }).then((howardsReply) => howardsReply.map((h) => h.original.text));
  console.log(texties);
  markov.addStates(texties);
  markov.train(3);
  return markov.generateRandom(50);
};

import Markov from "js-markov";

import { getHowardsReply } from "./searches";

const markov = new Markov();

const setup = async () => {
  const texties = await getHowardsReply({
    query: "getAll",
    argument: "really",
  })
    .then((howardsReply) => howardsReply.map((h) => h.original.text))
    .catch((e) => {
      console.log(`something died in markov setup`, e);
    });
  markov.addStates(texties);
  markov.train(3);
};

setTimeout(() => {
  setup();
  console.log("okay NOW howard-bolt has prepped the markov thing");
}, 60000); // give it a minute = in prod this runs before node-aggregator
// has started, and it fails becuase it can't getHowardsReply yet

export default async () => {
  return markov.generateRandom(50);
};

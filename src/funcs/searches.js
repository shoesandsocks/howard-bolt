import fetch from "node-fetch";

import { howard } from "./howard";

const rnd = (arr) => Math.floor(Math.random() * arr.length);
const url = "https://howardchicken.online/howard";

const getHowardsReply = async ({ query, argument }) => {
  const x = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, argument }),
  });
  console.log(x);
  return x;
};

export const randomQuote = () =>
  getHowardsReply("getQuote", 1)
    .then(({ howardsReply }) => howardsReply)
    .catch(() => "fartz");

export const markov = (text) =>
  getHowardsReply("getMarkov", text)
    .then(({ howardsReply }) => howardsReply)
    .catch(() => randomQuote());

export const poetize = (text) =>
  getHowardsReply("getPoem", text)
    .then(({ howardsReply }) => howardsReply)
    .catch(() => randomQuote());

export const search = (textToSearch) =>
  getHowardsReply("searchQuotes", textToSearch)
    .then(({ howardsReply }) => howardsReply)
    .then((reply) =>
      Array.isArray(reply) && reply.length > 0
        ? reply[rnd(reply)].text
        : randomQuote()
    )
    .catch(() => randomQuote());

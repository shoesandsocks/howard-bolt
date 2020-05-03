import fetch from "node-fetch";

import { howard } from "./howard";

const rnd = (arr) => Math.floor(Math.random() * arr.length);
const url = "https://howardchicken.online/howard";

const getQuote = () => fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: 'getQuote',
      argument: 1
    })
  });
};

export const randomQuote = () =>
  getQuote()
    .then(({ howardsReply }) => howardsReply)
    .catch(() => "fartz");

export const search = (textToSearch) =>
  howard("searchQuotes", textToSearch)
    .then(({ howardsReply }) => {
      return Array.isArray(howardsReply) && howardsReply.length > 0
        ? howardsReply[rnd(howardsReply)].text
        : randomQuote();
    })
    .catch(() => randomQuote());

export const markov = (text) =>
  howard("getMarkov", text)
    .then(({ howardsReply }) => howardsReply)
    .catch(() => randomQuote());

export const poetize = (text) =>
  howard("getPoem", text)
    .then(({ howardsReply }) => howardsReply)
    .catch(() => randomQuote());

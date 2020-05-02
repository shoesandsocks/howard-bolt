import { howard } from "./howard";

const rnd = (arr) => Math.floor(Math.random() * arr.length);

export const randomQuote = () =>
  howard("getQuotes", 1)
    .then(({ howardsReply }) => howardsReply[0].text)
    .catch(() => "failboat. :(");

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

import { howard } from "./howard";

const rnd = (arr) => Math.floor(Math.random() * arr.length);

export const randomQuote = () =>
  howard("getQuotes", 1)
    .then((reply) => reply[0].text)
    .catch(() => "failboat. :(");

export const search = (textToSearch) =>
  howard("searchQuotes", textToSearch)
    .then((reply) => {
      return Array.isArray(reply) && reply.length > 0
        ? reply[rnd(reply)].text
        : randomQuote();
    })
    .catch(() => randomQuote());

export const markov = (text) =>
  howard("getMarkov", text)
    .then((reply) => reply)
    .catch(() => "markov");

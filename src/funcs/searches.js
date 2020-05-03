import fetch from "node-fetch";

import { howard } from "./howard";

const rnd = (arr) => Math.floor(Math.random() * arr.length);
const url = "https://howardchicken.online/howard";

const getQuote = () => {
  const params = new URLSearchParams();
  params.append("query", "getQuotes");
  params.append("argument", 1);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
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

import fetch from "node-fetch";

const rnd = (arr) => arr[(Math.random() * arr.length) | 0];

const url = "https://node.porknachos.com/howardAPI/";

export const queries = {
  getAll: "getAll",
  getEpisode: "getEpisode",
  getRandomEpisode: "getRandomEpisode",
  getQuotes: "getQuotes",
  searchQuotes: "searchQuotes",
  getMarkov: "getMarkov",
  getPoem: "getPoem",
};

export const getHowardsReply = ({ query, argument }) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, argument }),
  })
    .then((y) => y.json())
    .then(({ howardsReply }) => {
      switch (query) {
        case queries.getEpisode:
        case queries.getRandomEpisode:
          return howardsReply.title;
        case queries.getAll:
          return argument === "really"
            ? howardsReply
            : rnd(howardsReply).original.text;
        case queries.searchQuotes:
          return howardsReply.length > 0
            ? rnd(howardsReply).text
            : getHowardsReply({ query: queries.getQuotes, argument: 1 });
        case queries.getQuotes:
          return argument > 1 ? rnd(howardsReply).text : howardsReply[0].text;
        case queries.getMarkov:
        case queries.getPoem:
        default:
          return howardsReply;
      }
    });

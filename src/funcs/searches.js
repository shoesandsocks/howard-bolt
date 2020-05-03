import fetch from "node-fetch";

const rnd = (arr) => Math.floor(Math.random() * arr.length);
const url = "https://howardchicken.online/howard";

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
          return rnd(howardsReply).original.text;
        case queries.searchQuotes:
          return howardsReply.length
            ? rnd(howardsReply).text
            : getHowardsReply({ query: "getQuotes", argument: 1 });
        case queries.getQuotes:
          return argument > 1 ? rnd(howardsReply).text : howardsReply[0].text;
        case queries.getMarkov:
        case queries.getPoem:
        default:
          return howardsReply;
      }
    });

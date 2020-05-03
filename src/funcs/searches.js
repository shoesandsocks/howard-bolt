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
  });

export const search = (textToSearch) =>
  getHowardsReply("searchQuotes", textToSearch)
    .then((response) => response.json())
    .then(({ howardsReply }) => howardsReply)
    .then((reply) =>
      Array.isArray(reply) && reply.length > 0
        ? reply[rnd(reply)].text
        : ["nertz"]
    )
    .catch(() => ["fartz"]);

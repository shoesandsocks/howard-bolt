import fetch from "node-fetch";

const url = "https://howardchicken.online/howard/core";

const runCoreUpdate = () =>
  fetch(url)
    .then((response) => response.json())
    .catch(() => {
      error: "boope";
    });

export default runCoreUpdate;

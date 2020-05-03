import fetch from "node-fetch";

const runCoreUpdate = () =>
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => json)
    .catch(() => {
      error: "boope";
    });

export default runCoreUpdate;

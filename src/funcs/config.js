const isProd = process.env.NODE_ENV == "production";
console.log(isProd);
const url = isProd
  ? "http://node-aggregator/howardAPI/core"
  : "https://node.porknachos.com/howardAPI/core";

console.log(url);

export default url;

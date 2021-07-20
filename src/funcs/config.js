const isProd = process.env.NODE_ENV == "production";
console.log(isProd);
const url = isProd
  ? "http://node-aggregator/howardAPI/"
  : "https://node.porknachos.com/howardAPI/";

export default url;

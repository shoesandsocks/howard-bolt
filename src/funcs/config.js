const isProd = process.env.NODE_ENV == "production";

const url = isProd
  ? "http://node-aggregator/howardAPI"
  : "https://node.porknachos.com/howardAPI";

export default url;

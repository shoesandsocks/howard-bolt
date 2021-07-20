import * as dotenv from "dotenv";
dotenv.config();

const fetch = require("node-fetch");
const Discord = require("discord.js");
const url = require("./funcs/config");

const client = new Discord.Client();

const howardRegex = /[hH]oward/;

const isHuman = (msg) => {
  try {
    return msg.author.bot === false;
  } catch {
    return false;
  }
};
const containsHoward = (msg) => {
  try {
    return msg.content.match(howardRegex);
  } catch {
    return false;
  }
};

// TODO: replace this with getHowardsReply("getQuotes", 1)?

const quote = async () => {
  try {
    const response = await fetch(url);
    // non-20x responses are still "successful" for try/catch
    // purposes, so...
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      return message;
    }
    const q = await response.text();
    return q;
  } catch (e) {
    // 50x responses actually throw and get caught here
    console.log(e);
    return "something went wrong fetching a quote from the API";
  }
};
client.on("ready", () => {
  console.log("Bot is ready");
});

//

client.login(process.env.DISCORD_BOT_TOKEN);

client.on("message", async (msg) => {
  if (isHuman(msg) && containsHoward(msg)) {
    const newQuote = await quote();
    // msg.reply(newQuote);
    msg.channel.send(newQuote);
  }
});

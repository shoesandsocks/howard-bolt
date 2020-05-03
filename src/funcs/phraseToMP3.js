require("dotenv").config();
import fetch from "node-fetch";

const ngrok = process.env.NGROK;
const code = process.env.CODE;

export default async (string) =>
  fetch(`https://${ngrok}.ngrok.io/danieltoserver`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, string }),
  });

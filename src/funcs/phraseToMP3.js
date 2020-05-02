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
// .then((reply) => reply.json())
// .then((json) => {
//   if (json.error) return res.json({ message: json.message });
//   return res.json({ message: "done", filename: json.response.filename });
// })
// .catch((e) => {
//   console.log(e);
//   return res.json({ message: "error there" });
// });

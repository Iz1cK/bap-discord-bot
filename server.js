import express from "express";
import cors from "cors";
import client from "./client.js";

// const { errorConverter, errorHandler } = require("./middlewares/error");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(errorConverter);
// app.use(errorHandler);

app.post("/mention", (req, res) => {
  const data = req.body;
  console.log(data);
  client.channels.cache
    .get("990391168565133335")
    .send(`<@${data.user.id}> mentions: ${data.message}`);
  res.status(200).send("success");
});

app.get("/text-channels", async (req, res) => {
  const guild = client.guilds.cache.get("989829603369562132");
  console.log(guild);
  const channels = JSON.parse(JSON.stringify(guild.channels)).guild.channels;
  console.log(channels);
  const textChannels = channels.filter(
    (channel) => channel.type === "GUILD_TEXT"
  );
  console.log(textChannels);
  res.status(200).send({ textChannels });
});

app.listen(port, () => {
  console.log(`Server running at 3.122.116.236:${port} `);
});

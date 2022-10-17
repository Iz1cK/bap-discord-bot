import express from "express";
import cors from "cors";
import redis from "./redis.js";
import fs from "fs";
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
    .get(data.channelid)
    .send(`<@${data.user.id}> mentions: ${data.message}`);
  res.status(200).send("success");
});

app.post("/mention-id", (req, res) => {
  const data = req.body;
  console.log(data);
  client.channels.cache
    .get(data.channelid)
    .send(`<@${data.userid}> ${data.message}`);
  res.status(200).send("success");
});

app.post("/name-game-matrix", (req, res) => {
  console.log(req.body);
  fs.writeFileSync("./output.txt", JSON.stringify(req.body));
  res.send(req.body);
});

app.get("/text-channels", async (req, res) => {
  const guild = client.guilds.cache.get("989829603369562132");
  const channels = await guild.channels.fetch();
  const textChannels = channels.filter((channel) => channel.type === 0);
  res.status(200).send(textChannels);
});

app.listen(port, () => {
  console.log(`Server running at 3.122.116.236:${port} `);
});

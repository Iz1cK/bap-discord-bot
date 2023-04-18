import client from "./client.js";
// import { AuditLogEvent } from "discord.js";
import redis from "./redis.js";
import { insertUser, getUserById } from "./model/users.model.js";
// import checkLanguage from "./utils/checkLanguage.js";
import { findWhosTurn } from "./utils/findWhosTurn.js";
import { toFilteredWords } from "./utils/toFilteredWords.js";
import { toNonFilteredWords } from "./utils/toNonFilteredWords.js";
import { discordids, lettersObj } from "./utils/usersDiscordIds.js";
import auth from "./utils/googleAuth.js";
import "./commands.js";
import log from "./utils/log.js";

import { updateOffenseCount, insertUserStats } from "./model/stats.model.js";

import { atspam } from "./handlers/atspam.handler.js";
import { info } from "./handlers/info.handler.js";
import { offenses } from "./handlers/offenses.handler.js";
import { random } from "./handlers/randomPicker.handler.js";
import { teamgen } from "./handlers/teamgen.handler.js";
import { spamowo } from "./handlers/spamowo.handler.js";

const imageReplies = [
  "https://i.pinimg.com/564x/b5/2a/66/b52a66699b378dba4e59447c527a2c4a.jpg",
  "https://i.pinimg.com/564x/3e/fe/bb/3efebbde464830b63c13ba95efa79bcc.jpg",
  "https://i.pinimg.com/564x/81/c1/8b/81c18b0d628af6068cc257a3bdd4d7a9.jpg",
  "https://i.pinimg.com/564x/a6/0c/51/a60c51240f8b1128ed731334b0dd1efc.jpg",
  "https://i.pinimg.com/564x/f9/4f/c5/f94fc5d7b34e5f1a5406a945263a6232.jpg",
  "https://i.pinimg.com/564x/81/df/64/81df642226c86a9bbd65c16050595ce1.jpg",
  "https://i.pinimg.com/564x/5b/59/cd/5b59cd45c479ab7e5e18c3ea580dfd61.jpg",
  "https://i.pinimg.com/736x/a6/50/08/a65008fd03e840e43790011f951f21d2.jpg",
  "https://i.pinimg.com/564x/09/47/89/094789c9ff48056b7a07fd3887e4908e.jpg",
  "https://i.pinimg.com/564x/6e/e8/c7/6ee8c74d1a476fd9046b3b811897d81a.jpg",
  "https://i.pinimg.com/564x/b2/c7/2e/b2c72ec485c6c4f5006c3c7514bb3d33.jpg",
];

client.on("ready", async () => {
  const guild = client.guilds.cache.get("989829603369562132");
  const guildMembers = await guild.members.fetch();
  guildMembers.forEach(async (member) => {
    if (!member.user.bot) {
      const exists = await getUserById(member.user.id);
      if (!exists) {
        const newUser = {
          discordid: member.user.id,
          username: member.user.username,
          discriminator: member.user.discriminator,
        };
        const insertedUser = await insertUser(newUser);
        const insertedUserStats = await insertUserStats({
          discordid: newUser.discordid,
          offensecount: 0,
        });
        log("member: ", insertedUserStats);
      }
    }
  });
  const memCount = client.channels.cache.get("1021593751510056970");
  memCount.setName(`Member Count: ${guild.memberCount}`);
  log("the bot is ready");
});

client.on("messageCreate", async (message) => {
  if (message?.author.bot) return;
  log(message.author.username + ": " + message.content);
  // if (checkLanguage(message.content)) {
  //   message.delete();
  //   const { offensecount } = await updateOffenseCount(message.author.id);
  //   message.channel.send(
  //     `Hey ${message.author.username}, language!(offense:${offensecount})`
  //   );
  // }
  let rand = Math.floor(Math.random() * 10) + 1;
  if (rand == 1) {
    message.reply(`Yo ${message.author.username}, shut up...`);
  } else if (rand == 2 && message.channelId != "1023978475729735771") {
    message.reply(`That's what she said`);
  } else if (rand == 3 && message.channelId != "1023978475729735771") {
    // if (Math.random() <= 0.7) {
    message.reply(
      imageReplies[Math.floor(Math.random() * imageReplies.length)]
    );
    // }
  }
  if (message.channelId == "1023978475729735771") {
    let jailed = false;
    const nonFilteredWords = toNonFilteredWords(
      await auth.getWords(auth.client)
    );
    let filteredWords = toFilteredWords(await auth.getWords(auth.client));
    const currTurn = findWhosTurn(filteredWords);
    if (discordids[currTurn.player] != message.author.id) {
      //JAIL
      message.reply(
        `${message.author.username} - not your turn, but it will be... in jail. Don't drop the soap ;)`
      );
      return;
    }
    const msg = message.content.trim();
    if (msg.split(" ").length > 1) {
      message.reply(`${message.author.username} - one word, you dingus!`);
      return;
    }
    if (msg.toLowerCase() == "jailed") {
      message.reply(
        `${message.author.username} you wanna go to jail that bad? Use a different word, dingus!`
      );
      return;
    }
    const wordsWithoutJailed = nonFilteredWords.filter(
      (word) => word.toLowerCase() !== "jailed"
    );
    const oldWord = wordsWithoutJailed[wordsWithoutJailed.length - 1];
    console.log({ oldWord });
    if (msg[0] != oldWord[oldWord.length - 1]) {
      message.reply(
        `${message.author.username}, the letter is "${
          oldWord[oldWord.length - 1]
        }" ya 7mar`
      );
      return;
    }
    if (nonFilteredWords.includes(msg.toLowerCase())) {
      //JAIL
      const putResponse = await auth.jail(auth.client, currTurn.cellIndeces);
      console.log(`Jailed {message.author.username}`);
      message.reply(
        `The word has already been used, ${message.author.username}. I'm going to use you - in jail ;) .... ;)`
      );
    }
    if (!jailed) {
      const putResponse = await auth.putWord(auth.client, currTurn.cell, msg);
      if (putResponse.status != 200) {
        message.reply(`Something went wrong, please try again later`);
        log("An error occured: " + putResponse);
      }
    }
    words = await auth.getWords(auth.client);
    filteredWords = toFilteredWords(words);
    nonFilteredWords = toNonFilteredWords(words);
    const nextTurn = findWhosTurn(filteredWords);
    oldWord = nonFilteredWords.filter(
      (word) => word.toLowerCase() !== "jailed"
    )[nonFilteredWords.length - 1];

    message.reply(
      `Your turn, <@${
        discordids[nextTurn.player]
      }>. Please type a word that starts with "${oldWord[oldWord - 1]}"`
    );
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  log(
    `${interaction.user.username} issue the command ${
      interaction.commandName
    } on ${interaction.options.getUser("target")?.username ?? "no one"}`
  );
  switch (interaction.commandName) {
    case "ping":
      await interaction.reply("Pong!");
      break;
    case "repo":
      await interaction.reply("https://github.com/Iz1cK/bap-discord-bot");
      break;
    case "atspam":
      atspam(interaction);
      break;
    case "info":
      info(interaction);
      break;
    case "offenses":
      offenses(interaction);
      break;
    case "random":
      random(interaction);
      break;
    case "owo":
      await interaction.reply("σωσ UwU OwO Nuzzle Wuzzle Blush σωσ");
      break;
    case "teamgen":
      teamgen(interaction);
      break;
    case "spamowo":
      spamowo(interaction);
      break;
    default:
      await interaction.reply({
        content: `Command you requested help for does not exist!`,
        ephemeral: true,
      });
      break;
  }
});
client.on("voiceStateUpdate", async (oldState, newState) => {
  let user = oldState.member.user;
  let oldChannel = oldState.channel || null;
  let newChannel = newState.channel || null;
  if (oldChannel === null) {
    log(`${user.username} joined ${newChannel.name}`);
    let currTime = new Date();
    redis.set(
      user.id,
      JSON.stringify({
        ...JSON.parse(await redis.get(user.id)),
        username: user.username,
        join_time: currTime,
      })
    );
  } else if (newChannel === null) {
    const data = JSON.parse(await redis.get(user.id));
    let currTime = new Date();
    let oldJoinTime = new Date(data.join_time ?? "");
    let oldStreamStartTime = new Date(data.stream_start_time ?? "");
    let oldDeafenStartTime = new Date(data.deafen_start_time ?? "");
    let oldMuteStartTime = new Date(data.mute_start_time ?? "");
    let joinDiffDate = Math.floor(currTime - oldJoinTime) / 1000;
    let streamDiffDate = Math.floor(currTime - oldStreamStartTime) / 1000;
    let deafonDiffDate = Math.floor(currTime - oldDeafenStartTime) / 1000;
    let muteDiffDate = Math.floor(currTime - oldMuteStartTime) / 1000;
    redis.set(
      user.id,
      JSON.stringify({
        ...data,
        total_online_time: (data.total_online_time || 0) + joinDiffDate,
        total_stream_time: (data.total_stream_time || 0) + streamDiffDate,
        total_deafen_time: (data.total_deafen_time || 0) + deafonDiffDate,
        total_mute_time: (data.total_mute_time || 0) + muteDiffDate,
      })
    );
    log(
      `${user.username} left ${oldChannel.name} after ${joinDiffDate} seconds`
    );
    console.log(JSON.parse(await redis.get(user.id)));

    return;
  } else if (newChannel && oldChannel && newChannel.id !== oldChannel.id) {
    log(`${user.username} moved from ${oldChannel.name} to ${newChannel.name}`);
  }

  if (newState.streaming && !oldState.streaming) {
    log(`${user.username} is now streaming`);
    let currTime = new Date();
    redis.set(
      user.id,
      JSON.stringify({
        ...JSON.parse(await redis.get(user.id)),
        stream_start_time: currTime,
      })
    );
  } else if (oldState.streaming && !newState.streaming) {
    const data = JSON.parse(await redis.get(user.id));
    let currTime = new Date();
    let oldStreamStartTime = new Date(data.stream_start_time ?? "");
    let streamDiffDate = Math.floor(currTime - oldStreamStartTime) / 1000;
    redis.set(
      user.id,
      JSON.stringify({
        ...data,
        total_stream_time: (data.total_stream_time || 0) + streamDiffDate,
      })
    );
    log(
      `${user.username} has stopped streaming after ${streamDiffDate} seconds`
    );
  }

  if (newState.selfDeaf || newState.serverDeaf) {
    log(`${user.username} is deafened`);
    let currTime = new Date();
    redis.set(
      user.id,
      JSON.stringify({
        ...JSON.parse(await redis.get(user.id)),
        deafen_start_time: currTime,
      })
    );
    return;
  } else if (oldState.selfDeaf || oldState.serverDeaf) {
    const data = JSON.parse(await redis.get(user.id));
    let currTime = new Date();
    let oldDeafenStartTime = new Date(data.deafen_start_time ?? "");
    let deafonDiffDate = Math.floor(currTime - oldDeafenStartTime) / 1000;
    redis.set(
      user.id,
      JSON.stringify({
        ...data,
        total_deafen_time: (data.total_deafen_time || 0) + deafonDiffDate,
      })
    );
    log(`${user.username} is no longer deafened after ${deafonDiffDate}`);
    return;
  }

  if (newState.selfMute || newState.serverMute) {
    log(`${user.username} is ${newState.serverMute ? "server " : ""}muted`);
    let currTime = new Date();
    redis.set(
      user.id,
      JSON.stringify({
        ...JSON.parse(await redis.get(user.id)),
        mute_start_time: currTime,
      })
    );
  } else if (oldState.selfMute || oldState.serverMute) {
    const data = JSON.parse(await redis.get(user.id));
    let currTime = new Date();
    let oldMuteStartTime = new Date(data.mute_start_time ?? "");
    let muteDiffDate = Math.floor(currTime - oldMuteStartTime) / 1000;
    redis.set(
      user.id,
      JSON.stringify({
        ...data,
        total_mute_time: (data.total_mute_time || 0) + muteDiffDate,
      })
    );
    log(
      `${user.username} is no longer ${
        oldState.serverMute ? "server " : ""
      }muted after ${muteDiffDate}`
    );
  }
});

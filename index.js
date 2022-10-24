import client from "./client.js";
import { AuditLogEvent } from "discord.js";
import redis from "./redis.js";
import { insertUser, getUserById } from "./model/users.model.js";
import checkLanguage from "./utils/checkLanguage.js";
import "./commands.js";
import log from "./utils/log.js";

import { updateOffenseCount, insertUserStats } from "./model/stats.model.js";

import { atspam } from "./handlers/atspam.handler.js";
import { info } from "./handlers/info.handler.js";
import { offenses } from "./handlers/offenses.handler.js";
import { random } from "./handlers/randomPicker.handler.js";
import { teamgen } from "./handlers/teamgen.handler.js";

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
  if (!message?.author.bot) {
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
    }
    if (message.channelId == "1023978475729735771") {
      const usedWords = JSON.parse(redis.get("name-game-words"));
      const msg = message.content.trim();
      if (msg.split(" ").length > 1)
        message.reply(`${message.author.username} Please type one word only!`);

      if (usedWords.includes(msg)) {
        message.reply(
          `${message.author.username} Word already used, haha you lost a turn dingus`
        );
      }
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
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

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
    if (checkLanguage(message.content)) {
      message.delete();
      const { offensecount } = await updateOffenseCount(message.author.id);
      message.channel.send(
        `Hey ${message.author.username}, language!(offense:${offensecount})`
      );
    }
    let rand = Math.floor(Math.random() * 10) + 1;
    if (rand == 1) {
      message.reply(`Yo ${message.author.username}, shut up...`);
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
// let interval;
client.on("voiceStateUpdate", async (oldState, newState) => {
  let user = oldState.member.user;
  let oldChannel = oldState.channel || null;
  let newChannel = newState.channel || null;
  //theres a problem with this approach to know who moved who, maybe I can match by time, when the move happened
  //that doesnt fully 100% eliminate it, but it would be very unlikely for it to break
  // const fetchedLogs = await newState.guild.fetchAuditLogs({
  //   limit: 1,
  //   type: AuditLogEvent.MemberMove,
  // });
  // const { executor } = fetchedLogs.entries.first();
  // if (executor) {
  //   log(
  //     `${user.username} was moved by ${executor.username} from ${oldChannel.name} to ${newChannel.name}.`
  //   );
  //   return;
  // }
  if (oldChannel === null) {
    log(`${user.username} joined ${newChannel.name}`);
    // let usertimer = 0;
    // interval = setInterval(() => {
    //   log(`${user.username} has been connected for ${usertimer} seconds`);
    //   usertimer += 1;
    // }, 1000);
    let currTime = new Date();
    log(currTime);
    redis.set(
      user.id,
      JSON.stringify({
        join_time: currTime,
        leave_time: null,
      })
    );
  } else if (newChannel === null) {
    log(`${user.username} left ${oldChannel.name}`);
    // clearInterval(interval);
    const data = JSON.parse(await redis.get(user.id));
    log(data);

    return;
  } else if (newChannel && oldChannel && newChannel.id !== oldChannel.id) {
    log(`${user.username} moved from ${oldChannel.name} to ${newChannel.name}`);
  }

  if (newState.streaming && !oldState.streaming) {
    log(`${user.username} is now streaming`);
  } else if (oldState.streaming && !newState.streaming) {
    log(`${user.username} has stopped streaming`);
  }

  if (newState.selfDeaf || newState.serverDeaf) {
    log(`${user.username} is deafened`);
    return;
  } else if (oldState.selfDeaf || oldState.serverDeaf) {
    log(`${user.username} is no longer deafened`);
    return;
  }

  if (newState.selfMute || newState.serverMute) {
    log(`${user.username} is ${newState.serverMute ? "server " : ""}muted`);
  } else if (oldState.selfMute || oldState.serverMute) {
    log(
      `${user.username} is no longer ${
        oldState.serverMute ? "server " : ""
      }muted`
    );
  }
});

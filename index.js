import client from "./client.js";
import { insertUser, getUserById } from "./model/users.model.js";
import checkLanguage from "./utils/checkLanguage.js";
import "./commands.js";
import { updateOffenseCount, insertUserStats } from "./model/stats.model.js";

import { atspam } from "./handlers/atspam.handler.js";
import { info } from "./handlers/info.handler.js";
import { offenses } from "./handlers/offenses.handler.js";

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
        console.log("member: ", insertedUserStats);
      }
    }
  });
  const memCount = client.channels.cache.get("1021593751510056970");
  memCount.setName(`Member Count: ${guild.memberCount}`);
  console.log("the bot is ready");
});

client.on("messageCreate", async (message) => {
  if (!message?.author.bot) {
    console.log(message.author.username + ": " + message.content);
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
  }
});

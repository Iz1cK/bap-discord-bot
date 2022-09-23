import client from "./client.js";
import { EmbedBuilder } from "discord.js";
import { insertUser, getUserById } from "./model/users.model.js";
import "./commands.js";
import {
  updateOffenseCount,
  insertUserStats,
  getAllUsersStats,
} from "./model/stats.model.js";

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
    if (checkLanguage(message.content)) {
      message.delete();
      const { offensecount } = await updateOffenseCount(message.author.id);
      message.channel.send(
        `Hey ${message.author.username}, language!(offense:${offensecount})`
      );
    }
    console.log(message.author.username + ": " + message.content);
    let rand = Math.floor(Math.random() * 10) + 1;
    if (rand == 1) {
      message.reply(`Yo ${message.author.username}, shut up...`);
    }
    // message.author.send(
    //   `Hello ${message.author.username}, Thank you for messaging me`
    // );
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
  if (interaction.commandName === "atspam") {
    const target = interaction.options.getUser("target");
    const amount = interaction.options.getInteger("amount");
    if (amount > 5)
      await interaction.reply({
        content: `Can't spam more than 5 times`,
        ephemeral: "true",
      });
    await interaction.reply(`<@${target.id}> IS A LOSER`);
    for (let i = 0; i < amount - 1; i++) {
      await interaction.followUp(`<@${target.id}> IS A LOSER`);
    }
  }
  if (interaction.commandName === "repo") {
    await interaction.reply("https://github.com/Iz1cK/bap-discord-bot");
  }
  if (interaction.commandName === "info") {
    if (interaction.options.getSubcommand() === "user") {
      const user = interaction.options.getUser("target");

      if (user) {
        await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
      } else {
        await interaction.reply(
          `Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`
        );
      }
    } else if (interaction.options.getSubcommand() === "server") {
      await interaction.reply(
        `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
      );
    }
  }

  if (interaction.commandName === "offenses") {
    const allUsersStats = await getAllUsersStats();
    const formattedStats = allUsersStats
      .map((user, index) => {
        if (index > 4) return null;
        return {
          name: `${index + 1}. ${user.username}`,
          value: "```" + user.offensecount + " offenses" + "```",
        };
      })
      .filter((el) => el !== null);
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Offenses Leaderboard")
      .setDescription("The current top 10 offenders in the server")
      .addFields(...formattedStats)
      .setTimestamp()
      .setFooter({
        text: "Powered by George Jobran",
      });

    interaction.reply({ embeds: [exampleEmbed] });
  }
});

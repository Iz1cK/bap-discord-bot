import shuffle from "../utils/shuffleArr.js";
import { EmbedBuilder } from "discord.js";

export const teamgen = async (interaction) => {
  const channel = interaction.options.getChannel("channel");
  const teamcount = interaction.options.getInteger("teamcount") || 1;
  if (!channel) {
    await interaction.reply({
      content: `Please specify channel`,
      ephemeral: "true",
    });
    return;
  }
  const members =
    channel.members
      .filter((member) => !member.user.bot)
      .map((member) => member.user.username)
      .sort() || [];
  if (members.length == 0) {
    await interaction.reply({
      content: `Can't make teams with no members`,
      ephemeral: "true",
    });
    return;
  }
  if (teamcount > members.length || teamcount < 0) {
    await interaction.reply({
      content: `Please enter a valid team count`,
      ephemeral: "true",
    });
    return;
  }
  let teams = [];
  for (let i = 0; i < teamcount; i++) {
    teams[i] = [];
  }
  for (let i = 0; i < members.length; i++) {
    teams[i % teamcount].push(members[i]);
  }
  let fields = [];
  for (let i = 0; i < teams.length; i++) {
    let value = "``` ";
    for (let j = 0; j < teams[i].length; j++) {
      value += teams[i][j];
      if (j < teams[i].length - 1) value += "\n ";
      if (j == teams[i].length - 1) value += "```";
    }
    fields.push({
      name: `Team ${i + 1}`,
      value: value,
    });
  }
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Generated Teams")
    .addFields(...fields)
    .setTimestamp()
    .setFooter({
      text: "Powered by George Jobran",
    });
  interaction.reply({ embeds: [exampleEmbed] });
};

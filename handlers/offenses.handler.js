import { getAllUsersStats } from "../model/stats.model.js";

export const offenses = async (interaction) => {
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
};

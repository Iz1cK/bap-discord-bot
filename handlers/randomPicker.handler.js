export const random = async (interaction) => {
  if (interaction.options.getSubcommand() === "channel") {
    const channel = interaction.options.getChannel("channel");
    const all = interaction.options.getBoolean("all");
    if (!channel) {
      await interaction.reply({ content: "Missing channel!", ephemeral: true });
      return;
    }
    const members = channel.members
      .map((member) => member.user.username)
      .sort();
    let rand = Math.floor(Math.random() * members.length);
    if (all) {
      let chosen = [];
      chosen.push(members[rand]);
      await interaction.reply(`Chosen member: ${members[rand]}`);
      while (chosen.length < members.length) {
        rand = Math.floor(Math.random() * members.length);
        if (chosen.includes(members[rand])) continue;
        chosen.push(members[rand]);
        await interaction.followUp(`Chosen member: ${members[rand]}`);
      }
    } else await interaction.reply(`Chosen member: ${members[rand]}`);
  }
};

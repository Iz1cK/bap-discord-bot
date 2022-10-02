export const sorry = async (interaction) => {
  const target = interaction.options.getUser("target");
  const user = interaction.user;
  if (user) {
    await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
  } else {
    await interaction.reply(
      `Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`
    );
  }
};

export const fuckyou = async (interaction) => {
  const target = interaction.options.getUser("target");
  const user = interaction.user;
  if (!user)
    await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
};

export const atspam = (interaction) => {
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
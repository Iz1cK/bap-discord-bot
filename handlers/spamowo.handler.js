export const spamowo = async (interaction) => {
  const target = interaction.options.getUser("target");
  const amount = interaction.options.getInteger("amount");
  for (let i = 0; i < amount; i++) {
    target.send(`σωσ UwU OwO Nuzzle Wuzzle Blush σωσ`);
  }
};

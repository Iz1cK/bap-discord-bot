import { SlashCommandBuilder } from "discord.js";

const atspam = new SlashCommandBuilder()
  .setName("atspam")
  .setDescription("spams someone repeatedly")
  .addUserOption((option) =>
    option.setName("target").setDescription("The user").setRequired(true)
  )
  .addIntegerOption((option) =>
    option.setName("amount").setDescription("Amout of spam").setRequired(true)
  );
export default atspam;

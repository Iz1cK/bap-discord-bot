import { SlashCommandBuilder } from "discord.js";

const sorry = new SlashCommandBuilder()
  .setName("sorry")
  .setDescription("Apologizes to the person")
  .addUserOption((option) =>
    option.setName("target").setDescription("The user to apologize to")
  );

export default sorry;

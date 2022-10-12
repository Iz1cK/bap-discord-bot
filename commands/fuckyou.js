import { SlashCommandBuilder } from "discord.js";

const fuckyou = new SlashCommandBuilder()
  .setName("fuckyou")
  .setDescription("Says fuck you to the person")
  .addUserOption((option) =>
    option.setName("target").setDescription("The user to say fuck you to")
  );

export default fuckyou;

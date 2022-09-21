import { SlashCommandBuilder } from "discord.js";

const offenses = new SlashCommandBuilder()
  .setName("offenses")
  .setDescription("Shows the offenses leaderboard");

export default offenses;

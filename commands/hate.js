import { SlashCommandBuilder } from "discord.js";

const hate = new SlashCommandBuilder()
  .setName("hate")
  .setDescription("Hate someone on the server");

export default hate;

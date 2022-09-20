import { SlashCommandBuilder } from "discord.js";

const repo = new SlashCommandBuilder()
  .setName("repo")
  .setDescription("Send the Github repository link");

export default repo;

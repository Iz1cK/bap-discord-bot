import { SlashCommandBuilder } from "discord.js";

const ping = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pings the bot");

export default ping;

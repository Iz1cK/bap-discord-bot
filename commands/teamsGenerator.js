import { SlashCommandBuilder } from "discord.js";
const teamgen = new SlashCommandBuilder()
  .setName("teamgen")
  .setDescription("Generate teams from a channel")
  .addChannelOption((option) =>
    option.setName("channel").setDescription("Which channel to pick from")
  )
  .addIntegerOption((option) =>
    option.setName("teamcount").setDescription("How many teams to generate")
  );

export default teamgen;

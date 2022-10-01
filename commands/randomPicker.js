import { SlashCommandBuilder } from "discord.js";

const random = new SlashCommandBuilder()
  .setName("random")
  .setDescription("Pick a user or a group of users from a channel")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("channel")
      .setDescription("Pick a random member from a channel")
      .addChannelOption((option) =>
        option.setName("channel").setDescription("Which channel to pick from")
      )
      .addBooleanOption((option) =>
        option.setName("all").setDescription("Rolls as many times as members")
      )
  );

export default random;

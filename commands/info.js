import { SlashCommandBuilder } from "discord.js";

const info = new SlashCommandBuilder()
  .setName("info")
  .setDescription("Get info about a user or a server!")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("user")
      .setDescription("Info about a user")
      .addUserOption((option) =>
        option.setName("target").setDescription("The user")
      )
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("server").setDescription("Info about the server")
  );

export default info;

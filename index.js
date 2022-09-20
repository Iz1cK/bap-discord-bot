import client from "./client.js";
import "./commands.js";

client.on("ready", () => {
  console.log("the bot is ready");
});

client.on("messageCreate", async (message) => {
  if (!message?.author.bot) {
    console.log(message.content);
    // message.reply(`Yo ${message.author.username}, shut up...`);
    // message.author.send(
    //   `Hello ${message.author.username}, Thank you for messaging me`
    // );
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
  if (interaction.commandName === "atspam") {
    const target = interaction.options.getUser("target");
    const amount = interaction.options.getInteger("amount");
    await interaction.reply(`<@${target.id}> IS A LOSER`);
    for (let i = 0; i < amount; i++) {
      await interaction.followUp(`<@${target.id}> IS A LOSER`);
    }
  }
});

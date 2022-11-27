const SlashCommand = require("../../src/structures/SlashCommand")
const Discord = require('discord.js');

module.exports = class NotifyCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "notificar",
      description: 'Fique ligadinho nas novidades que estão por vir!',
      devGuild: true
    })
  }

  async run(client, interaction, context) {
    interaction.ffReply("Ble!")
  }
}
const SlashCommand = require("../../src/structures/SlashCommand")
const Discord = require('discord.js');

module.exports = class NotifyNewsCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "novidades",
      description: 'Fique ligado as novidades que estão por vir no servidor e no FlyHigh',
      subCommand: true,
      command: "notificar",
      devGuild: true
    })
  }

  async run(client, interaction, context) {
    var member = context.guild.getMember(context.author)
    var notifyRole = "769895515860631583"
    
    if (member.roles.cache.has(notifyRole)) {
      member.roles.remove(notifyRole)
      interaction.ffReply(
        "Sério mesmo que você não quer mais receber minhas incríveis novidades? E eu pensava que nós eramos amigos...",
        "826430408173813820",
        {ephemeral: true}
      )
    } else {
      member.roles.add(notifyRole)
      interaction.ffReply("Agora você irá ser notificado sobre as minhas novidades!", "826414452969963520", {ephemeral: true})
    }
  }
}
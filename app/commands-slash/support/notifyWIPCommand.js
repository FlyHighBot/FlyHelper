const SlashCommand = require("../../src/structures/SlashCommand")
const Discord = require('discord.js');

module.exports = class NotifyCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "wip",
      description: 'Fique ligado em tudo em que estamos trabalho no FlyHigh, e tudo que será adicionado nele!',
      subCommand: true,
      command: "notificar",
      devGuild: true
    })
  }

  async run(client, interaction, context) {
    var member = context.guild.getMember(context.author)
    var notifyRole = ""
    
    if (member.roles.cache.has(notifyRole)) {
      member.roles.remove(notifyRole)
      interaction.ffReply(
        "Sério mesmo que você não quer mais receber minhas incríveis novidades? E eu pensava que nós eramos amigos...",
        "826430408173813820",
        {ephemeral: true}
      )
    } else {
      member.roles.add(notifyRole)
      interaction.ffReply("Agora você irá ser notificado sobre as minhas novidades!", "826430275961487360", {ephemeral: true})
    }
  }
}

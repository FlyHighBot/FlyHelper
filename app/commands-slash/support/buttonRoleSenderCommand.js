const SlashCommand = require("../../src/structures/SlashCommand")
const RoleButtons = require("../../src/utils/RoleButtons")
const Discord = require('discord.js');

module.exports = class ButtonRoleSenderCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "buttonrolesender",
      description: 'Envia a mensagem de cargos no canal selecionado',
      options: [{
        name: 'channel',
        description: 'O canal onde a mensagem deve ser enviada',
        type: 'CHANNEL',
        required: true
      }],
      onlyDevs: true,
      devGuild: true
    })
  }

  async run(client, interaction, context) {
    var channel = interaction.options.getChannel('channel')
    var classes = RoleButtons.registerButtons(context.guild)
    var baseMessages = RoleButtons.getMessages(classes)
    
    try {
      await baseMessages.forEach(it => channel.send(it)) 
      
      interaction.ffReply(`Yay! Deu tudo certo, enviei tudo no canal, ${channel.toString()}`)
    } catch(err) {
      interaction.ffReply(`Deu tudo errado irmão kkk, se liga \n\`${err}\``)
    }
  }
}
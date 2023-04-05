const SlashCommand = require("../../src/structures/SlashCommand")
const { checkEmoji } = require('../../src/utils/checkEmoji.js')
const Discord = require('discord.js');

module.exports = class TicketMenuSenderCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "ticketmenusender",
      description: 'Envia a mensagem de ticket no canal selecionado',
      options: [{
        name: 'channel',
        description: 'O canal onde a mensagem deve ser enviada',
        type: 'CHANNEL',
        required: true
      }, {
        name: 'type',
        description: 'O tipo de menu que deverá ser enviado',
        type: 'STRING',
        choices: [{
          name: 'Denúncia de Players',
          value: 'report'
        }, {
          name: 'Suporte Mentor',
          value: 'mentor'
        }],
        required: true
      }],
      onlyDevs: true,
      devGuild: true
    })
  }

  async run(client, interaction, context) {
    var channel = interaction.options.getChannel('channel');
    var type = interaction.options.get('type')?.value;

    var data = this.getMessageData(client, type)

    try {
      channel.send(data)

      interaction.ffReply(`Yay! Deu tudo certo, enviei tudo no canal, ${channel.toString()}`)
    } catch(err) {
      interaction.ffReply(`Deu tudo errado irmão kkk, se liga \n\`${err}\``)
    }
  }

  getMessageData(client, type) {
    return {
      mentor: {
        embeds: [
          new Discord.MessageEmbed()
              .setColor(client.constants.FLY_COLOR)
              .setTitle("<:fly_coffee:826415473775869962> Central de Ajuda")
              .setDescription([
                `${checkEmoji(client, "826430254084128829")} **|** Precisando resolver um problema relacionado à mentores no servidor? Veio até o chat certo então!`,
                `${checkEmoji(client, "826430829181141062")} **|** Para iniciar o seu pedido de re-adicionar o mentor, clique no botão abaixo! Lembre-se de estar com tudo pronto para enviar o seu ticket!`,
                `${checkEmoji(client, "869310000768614400")} **|** Após criar seu ticket, aguarde até que os Administradores te respondam! E não fique mencionando ou incomando a staff para que eles vejam seu ticket.`
              ].join("\n\n"))
        ],
        components: [
          new Discord.MessageActionRow().addComponents(
              new Discord.MessageButton()
                  .setLabel("Abrir ticket")
                  .setCustomId("ticket:create:mentor")
                  .setEmoji("830475809490862112")
                  .setStyle("SUCCESS")
          )
        ]
      },
      report: {
        embeds: [
          new Discord.MessageEmbed()
              .setColor(client.constants.FLY_COLOR)
              .setTitle("<:fly_coffee:826415473775869962> Central de Denúncias")
              .setDescription([
                `${checkEmoji(client, "828360789529985066")} **|** Precisando resolver um problema relacionado à denúncias no servidor? Veio até o chat certo então!`,
                `${checkEmoji(client, "826430206487166996")} **|** Para iniciar o seu report, selecione um servidor no **Menu** e depois selecione a opção "Abrir ticket de denúncia"! Lembre-se de estar com tudo pronto para enviar o seu ticket!`,
                `${checkEmoji(client, "941726163498315796")} **|** Após criar seu ticket, aguarde até que os Administradores te respondam! E não fique mencionando ou incomando a staff para que eles vejam seu ticket.`
              ].join("\n\n"))
        ],
        components: [
          new Discord.MessageActionRow().addComponents(
              new Discord.MessageSelectMenu()
                  .setPlaceholder("Selecione um servidor")
                  .setCustomId("ticket:create:report")
                  .setMinValues(2)
                  .setMaxValues(2)
                  .addOptions(client.constants.SERVERS.map(it => { return { value: it.value, label: it.name, emoji: '721480875040047194' }}))
                  .addOptions({value: 'create', label: "Abrir ticket de denúncia", emoji: "830475809490862112"})
          )
        ]
      }
    }[type]
  }
}

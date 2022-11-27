const ServerResponse = require("../../src/structures/serverResponses")

var patterns = [
  "qual|me|algu(é)m",
  "envia|(é|e)|passa|manda|",
  "o|os",
  "endere(ç|c)o de|",
  "ip",
  "do",
  "((naruto|nc)|(nanatsu|nnt)|(dbc|dragon ball)|(ds|demon slayer)|(poke))(fly|)|servidor|",
  "fly|"
]

module.exports = class ServersIPResponse extends ServerResponse {
  constructor(client) {
    super(client, patterns, {
      name: "ServersIPResponse",
      priority: 0,
      ignoreDevs: false,
    })
	}
  
  async run(client, message) {
    message.build(
      message.flyReply(`vamos por partes... A Rede FlyHigh apresenta uma váriedade de servidores. Para descobrir o ip de algum servidor, você pode ir no <#826349439245221918> e ir no tópico do canal, igual é mostrado nessa imagem. E digitar o comando do servidor desejado!`, "826431055161983026"),
      message.flyReply(`Não entendeu? Vamos tentar assim, vá no <#${client.constants.FLY_SUPPORT_CHANNEL_ID}> e mencione os <@&${client.util.FLY_SUPPORT_ID}> para que eles possam te ajudar a responder essa pergunta! Uma boa tarde!`, "826430254084128829", false),
      `{ "option": { "allowedMentions": { "roles": ["812686310472679494"], "users": ["${message.author.id}"] } } }`
    )
  }
}

const ServerResponse = require("../../src/structures/serverResponses")

var patterns = [
  "(bota|adicion(a|o)|coloc(a|o)|poe|convid(o|a))r?",
  "(a|o|u)?",
  "(flyhigh|fly|<@!?723961030841204807>)",
]

module.exports = class AddFlyInMyServerResponse extends ServerResponse {
  constructor(client) {
    super(client, patterns, {
      name: "AddFlyInMyServerResponse",
      priority: 0,
      ignoreDevs: false,
    })
  }
  
  async run(client, message) {
    if (message.content.match("/flyhigh (helper|canary)/ig")) 
      return message.ffReply("Infelizmente você não pode adicionar essas minhas versões diferentes, elas são privadas e servem ou para testes ou para funcionamentos dos servidores do FlyHigh", "826430408173813820")

    message.build(
      message.flyReply(`Querendo me adicionar? Para me convidar para o seu servidor é muiitoo simples!`, "826415473969070090"),
      message.flyReply(`Basta digitar o comando \`d!invite\` e clicar no primeiro link da mensagem!`, "826430254084128829", false),
      message.flyReply(`Ou então, você pode me enviar o convite do seu servidor nas mensagens diretas, assim eu irei criar um link para que você me adicione nele!`, "828360789529985066", false),
      message.flyReply(`Se você tiver alguma outra dúvida de como me adicionar, basta mencionar o cargo de Suporte!!`, "869310000768614400", false)
    )
  }
}

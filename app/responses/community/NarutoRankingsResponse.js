const ServerResponse = require("../../src/structures/serverResponses")

var patterns = [
  "como|me ajuda|onde",
  "vir(a|o)|upa|fa(z|s|ço|sso)",
  "a (quest|missao)( pra vir(a|ar)|)|",
  "jounin|chunin|genin|nukenin|anbu|akatsuki"
]

module.exports = class NarutoRankingsResponse extends ServerResponse {
  constructor(client) {
    super(client, patterns, {
      name: "NarutoRankingsResponse",
      priority: 0,
      ignoreDevs: false
    })
	}

  run(client, message) {
    message.build(
      message.flyReply("Com dúvidas sobre o FlyHigh? Pegue o cargo <@&> no <#> para obter acesso ao canal de Dúvidas Frequentes.", "828360658159927316"),
      message.flyReply("Após obter o cargo você pode tirar as dúvidas de rankings neste canal aqui <#716065542741426216>.", "779445435085357116", false),
      message.flyReply("Sua dúvida é sobre outras sagas? Neste canal aqui <#702147193217220628> você pode ver nossos FAQ's de ajuda de sagas.", "802214533367332935", false),
      `{ "option": { "allowedMentions": { "roles": ["812686310472679494"], "users": ["${message.author.id}"] } } }`
    )
  }
}

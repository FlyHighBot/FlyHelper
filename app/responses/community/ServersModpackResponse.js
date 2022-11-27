const ServerResponse = require("../../src/structures/serverResponses")

var patterns = [
  "me|alguem",
  "envia|passa|manda|ajuda",
  "o|os|aqueles|(a |)baixar( (o|os)|)",
  "modpack|mods|baixar|technic",
  "do?( servidor|)",
  "((naruto|nc)|(nanatsu|nnt)|(dbc|dragon ball)|(ds|demon slayer)|(poke))(fly|)",
  "fly|"
]

module.exports = class ServersModpackResponse extends ServerResponse {
  constructor(client) {
    super(client, patterns, {
      name: "ServersModpackResponse",
      priority: 0,
      ignoreDevs: false,
    })
	}
  
  async run(client, message) {    
    message.build(
      message.flyReply(`opa, caso você queira o modpack de algum servidor, você pode tentar utilizar o comando do servidor \`d!(nome do servidor)\` ou ir no **canal de FAQ (<#702190636698435594>)** e clicar no servidor no qual você quer jogar.`, "826430829181141062")
    )
  }
}

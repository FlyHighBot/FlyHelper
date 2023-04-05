const ServerResponse = require("../../src/structures/serverResponses")

var patterns = [
  "(alg(m|uém|uem) ((vend(er|end(o|o a)))|((est|t)á|quer) (vend(er|end(o|o a))))|compr(a|o)",
  "cont(a|as) ((no |em |na )|)(serv(idor|er)|(naruto|nanatsu|(ds|demon(slayer|.slayer))).fly)|(cont(as|a)))"
]

module.exports = class SellingAccountWarnResponse extends ServerResponse {
  constructor(client) {
    super(client, patterns, {
      name: "SellingAccountWarnResponse",
      priority: 0,
      ignoreDevs: false,
    })
	}
  
  async run(client, message) {
    message.build(
      message.flyReply("Epa, alguém ai querendo **vender/comprar** contas? Espera ai amigo, antes de comprar qualquer coisa é preciso verificar algumas coisinhas:", "826435905769308240"),
      message.flyReply("**Primeiro de tudo, compre por locais onde você pode abrir disputas ou reembolsar:** Nós recomendamos plataformas como PayPal ou MercadoPago;", "826430829181141062", false),
      message.flyReply("**Peça prints e provas de que a conta realmente pertença a pessoa:** Você pode fazer isso pedindo as pessoas prints dela em jogo, mensagens no chat do servidor e etc;", "826431055161983026", false),
      message.flyReply("**Procure um Administrador para caso você tenha alguma suspeita sobre a compra:** Se a pessoa parecer suspeita, peça ajuda à um administrador antes de comprar;", "826414885659344896", false),
      message.flyReply("**NÃO transfira todo o dinheiro da transação, negocie com pessoas que aceitem a metade do pagamento antes de concluir tudo:** Pague o resto após trocar a conta, e se você estiver vendendo e for roubado por causa disso, peça um Administrador para trocar a senha da sua conta.\n", "826416082012733460", false),
      message.flyReply("Acho que é isso galera, tomem cuidado, beijos do FlyHigh", "826430829181141062", false)
    )
  }
}

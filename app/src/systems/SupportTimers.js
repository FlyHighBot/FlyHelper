const CronJob = require('cron').CronJob;
const { checkEmoji } = require('../utils/checkEmoji.js')

module.exports = {
  run: async (client) => {

    var channels = ["", ""]
    
    const job = new CronJob('0 */50 * * * *', async () => {
      for (const id in channels) {
        
        let channel = client.channels.cache.get(channels[id])
        
        var selfMessages = await channel.messages.fetch({ limit: 100 })
          .then(messages => messages.filter(it => it.author.id == client.user.id))
        
        if (selfMessages && selfMessages.array().length !== 0) {
          if (selfMessages.first().content.includes("LEIA ANTES DE PERGUNTAR")) {
            if ((Date.now() - selfMessages.first().createdTimestamp) < 600000) continue;
          }
        }
        
        if (channel.lastMessage && channel.lastMessage.author.id == client.user.id) {
          if (channel.lastMessage.content.includes("LEIA ANTES DE PERGUNTAR")) continue;
        }
        
        var type = channel.guild.id == process.env.SUPPORT_GUILD ? "support" : "community"
                
        let supportRole = client.constants.FLY_SUPPORT_ID, newsChannel = client.constants.FLY_STATUS_ID, context = `no <#${client.constants.SUPPORT_FAQ_CHANNEL_ID}>`
        if (type == "community") supportRole = client.constants.FLY_SUPPORT_ID, newsChannel = client.constants.FLY_ANNOUNCEMENTS_ID, context = "em algum canal de dúvidas frequentes"
        
        channel.build(
          `${checkEmoji(client, "826414452969963520")} **| LEIA ANTES DE PERGUNTAR!**`,
          `${checkEmoji(client, "826430829181141062")} **| Se for uma dúvida:** Veja se a resposta da sua pergunta está ${context}! Caso não esteja lá, envie a sua pergunta aqui e, na mensagem, mencione o <@&${supportRole}>, nós iremos tentar te ajudar o mais breve possível!`,
          `${checkEmoji(client, "826430254084128829")} **| Se você irá perguntar se algo foi alterado/adicionado/removido:** Veja o canal <#${newsChannel}> para saber!`,
          `{ "option": { "allowedMentions": { "roles": ["769894020654563378"] } } }`
        )
          
        console.log("[SUPPORT TIMER]", `Mensagem foi enviada com sucesso em ${channel.guild.name}.`)
      }
    })
    
    job.start()
  },
  
  config: {
    "events": ["ready"]
  }
}

module.exports = {
  run: async (client, message) => {
    const guild = message.guild
    
    if (!client.constants.ALLOWED_CHANNELS.includes(message.channel.id)) return;
    if (message.author.isStaff() || message.author.isDev()) return;
    if (message.author.bot) return;
    if (message.mentions.users.size == 0) return;
    
    var mentionedUsers = [...message.mentions.users.array()], validUsers = []
    let userWarned = false
        
    for (var user in mentionedUsers) {
      if (mentionedUsers[user].isStaff() || mentionedUsers[user].isDev()) {
        validUsers.push(mentionedUsers[user])
      }
    }
        
    if (validUsers.length !== 0) {
      if (/((conversa|vem|vamos|pode?( vir|)|libera|coisa)(r|)) ?(|.*) (pv|dm|privado)/ig.test(message.content)) {
        userWarned= true
        return message.build(
            message.flyReply("**Não mencione pessoas da equipe!** As vezes elas podem estar ocupadas... vai se ela está cagando e você aí, incomodando ela...", "826416082012733460"),
            message.flyReply("**Não damos suporte via DM!** Não insista para que algum staff te atenda via mensagem direta, seja direto com a pessoa.", false)
          )
      }
    }
  },
  
  config: {
    "events": ["messageCreate"]
  }
}
const { stackFAQ } = require('../utils/messageUtils')

module.exports = {
  run: async (client, message) => {
     if (message.channel.type !== "dm") {
       if (message.author == client.user) return
       stackFAQ(message, "Perguntas Frequentes", "769900882887180288")
     }
  },
  
  config: {
    "events": ["messageCreate", "messageDelete", "messageUpdate"]
  }
}
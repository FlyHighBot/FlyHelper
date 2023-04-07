const { MessageEmbed, MessageAttachment, MessageButton, MessageActionRow } = require('discord.js');
const { flyTimeNow, formatDate, getRelativeTime } = require('../../src/utils/timeUtils.js')
const { checkEmoji } = require('../../src/utils/checkEmoji.js')
const { Constants } = require("../../src/utils/Constants.js");
const RoleButtons = require("../../src/utils/RoleButtons");
const Util = require('../../src/utils/Util.js');
const humanizeDuration = require("humanize-duration");
const Discord = require('discord.js');
const moment = require('moment');
const fs = require('fs');

module.exports = {
  run: async (client, message, args) => {
    var code = args.join(" "), evaled, originalEval, guild = message.guild, channel = message.channel, author = message.author, bot = client.user
    if (message.author !== client.owner) return message.ffReply("apenas pessoas especiais podem utilizar esse comando :3", "557355064864538624");
    if (!code) return message.ffReply('Está faltando os argumentos, esqueceu disso?', "826415473775869962")
    if (!code.includes("return") && code.includes("await")) code = `return ${code}`
    
    process.env.TOKEN = "[Secret Token]"
  
    try {
      code = code.replace(/(client.token)/ig, "\"[Secret Token]\"")
      
      if (code.includes("await")) evaled = await eval(`(async () => {${code}})()`);
      else evaled = await eval(code)
      
      originalEval = `${evaled}`.replace(new RegExp(client.token, "ig"), "[Secret Token]")
      
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      evaled = evaled.replace(new RegExp(client.token, "ig"), "[Secret Token]")
      
      var button = new Discord.MessageButton().setCustomId("code").setLabel("Ver outro tipo de eval").setStyle("SECONDARY").setEmoji("860663445825388554");

      if (evaled.length >= 2000) {
        return message.ffReply("Eta bixo, muita coisa voltou!", [new MessageAttachment(new Buffer.from(evaled, "utf8"), "code.js"), button])
          .then(msg => {
          const filter = (int) => int.user.id === message.author.id && int.customId == "code";
          const collector = msg.createMessageComponentCollector({ filter, time: 60000*10 })
          collector.on('collect', async it => {
            msg.ffReply("Aqui está a outra opção do eval, yay!", {edit: true, files: [new MessageAttachment(new Buffer.from(originalEval, "utf8"), "code.js")]})
            it.deferUpdate()
            collector.stop()
          })
        })
      }
      
      let embed = new MessageEmbed()
        .setTitle("Sucesso!")
        .setDescription(`\`\`\`js\n${evaled}\`\`\``)
        .setColor(client.constants.FLY_COLOR);
      
      message.ffReply("Mama mia", [embed, button])
        .then(msg => {
        const filter = (int) => int.user.id === message.author.id && int.customId == "code";
        const collector = msg.createMessageComponentCollector({ filter, time: 60000*10 })
        collector.on('collect', async it => {
          msg.ffReply("Aqui está a outra opção do eval, yay!", {edit: true, files: [new MessageAttachment(new Buffer.from(originalEval, "utf8"), "code.js")]})
          it.deferUpdate()
          collector.stop()
        })
      })
    } catch (err) {
      if (err.length >= 2000) return message.ffSend([new MessageAttachment(new Buffer.from(err, "utf8"), "eval.js"), button])
      return message.ffSend(`Alguma coisa deu extremamente errada ao executar este comando... Desculpe pela inconveniência. \`${err}\``, "813179670270967819");
    }

    function sendFile(string, format = 'txt') {
      return message.ffSend(
        new MessageAttachment(new Buffer.from(string, "utf8"), `file.${format}`)
      )
    }
  },
  
  conf: {},
  
  get help() {
    return {
      name: "eval",
      category: "Magic"
    }
  }
}

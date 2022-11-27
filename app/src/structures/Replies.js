const { Util, Message, TextChannel, User, GuildMember, MessageEmbed } = require("discord.js");
const { CommandInteraction, ButtonInteraction, Guild, Interaction } = require("discord.js")
const { checkEmoji } = require('../utils/checkEmoji.js');
const ClassUtil = require('../utils/Util');

module.exports = class Replies {
  static start() {
    Interaction.prototype.send = function(content, options) {
      var data = Replies.parseMessage(content, options);

      if (data?.followUp) return this.followUp(data)
      if (this.replied || this.deferred) data.edit = true
      
      if (data?.update) return this.update(data)
      if (data?.edit) return this.editReply(data)

      return this.reply(data)
    }
    
    Message.prototype.ffSend = async function(content, emoji = "🔹", mentionUser= true, data={}) {
      var data = Replies.buildFancy(this, content, emoji, mentionUser, data, true)
      
      if (data?.edit) return this.edit(data)

      return this.channel.send(data)      
    }
        
    TextChannel.prototype.ffSend = async function(content, emoji = "🔹", mentionUser=false, data={}) {
      return Replies.buildFancySend(this, content, emoji, mentionUser, data, true)
    }

    Message.prototype.ffReply = async function(content, emoji = "🔹", mentionUser=true, data={}) {
      var data = Replies.buildFancy(this, content, emoji, mentionUser, data, true)

      if (data?.edit) return this.edit(data)
      
      try {
        return this.reply(data)
      } catch(e) {
        return this.channel.send(data)
      }
    }
    
    CommandInteraction.prototype.ffReply = function(content, emoji= "🔹", mentionUser= true, data) {
      return Replies.interactionReply(this, content, emoji, mentionUser, data);
    }
    
    ButtonInteraction.prototype.ffReply = function(content, emoji= "🔹", mentionUser= true, data) {
      return Replies.interactionReply(this, content, emoji, mentionUser, data);
    }
    
    Interaction.prototype.ffReply = function(content, emoji= "🔹", mentionUser= true, data) {
      return Replies.interactionReply(this, content, emoji, mentionUser, data);
    }
    
    CommandInteraction.prototype.build = function(...object) {
      return Replies.interactionBuild(this, object)
    }
    
    Interaction.prototype.build = function(...object) {
      return Replies.interactionBuild(this, object)
    }
    
    ButtonInteraction.prototype.flyReply = function(content, emoji= "🔹", mentionUser = true) {
      return Replies.flyReply(this, content, emoji, mentionUser)
    }
    
    Interaction.prototype.flyReply = function(content, emoji= "🔹", mentionUser = true) {
      return Replies.flyReply(this, content, emoji, mentionUser)
    }
    
    Message.prototype.flyReply = function(content, emoji= "🔹", mentionUser = true) {
      return Replies.flyReply(this, content, emoji, mentionUser)
    }
    
    Message.prototype.build = function(...object) {
      let messageContent = [], config = {}

      object.forEach(it => {
        if (ClassUtil.isJSON(it)) config = JSON.parse(it).option
        else messageContent.push(it)
      })
      
      var data = Replies.parseMessage(messageContent.join("\n"), config);
      
      try {
        return this.reply(data)
      } catch(e) {
        return this.channel.send(data)
      }
    }
    
    TextChannel.prototype.build = function(...object) {
      let messageContent = [], config = {}

      object.forEach(it => {
        if (ClassUtil.isJSON(it)) config = JSON.parse(it).option
        else messageContent.push(it)
      })
      
      var data = Replies.parseMessage(messageContent.join("\n"), config);
      
      return this.send(data)
    }
  }
  
  static interactionReply(ref, content, emoji, mentionUser, data) {
    var data = Replies.buildFancy(ref, content, emoji, mentionUser, data);
    
    if (data?.followUp) return ref.followUp(data)
    if (ref.replied || ref.deferred) data.edit = true
    
    if (data?.update) return ref.update(data)
    if (data?.edit) return ref.editReply(data)
    
    return ref.reply(data)
  }
  
  static interactionBuild(ref, object) {
    let messageContent = [], config = {}
    
    object.forEach(it => {
      if (ClassUtil.isJSON(it)) config = JSON.parse(it).option
      else messageContent.push(it)
    })
      
    config.content = messageContent.join("\n")
    
    if (config?.followUp) return ref.followUp(config)
    if (ref.replied || ref.deferred) config.edit = true
    
    if (config?.update) return ref.update(config)
    if (config.edit) return ref.editReply(config)
    
    return ref.reply(config)
  }
  
  static flyReply(ref, content, emoji= "🔹", mentionUser = true) {
    if (!content) content = ''
    if (typeof emoji === "boolean") mentionUser= emoji, emoji= "🔹"
    var author = ref.author ? ref.author : ref.user
    var user = mentionUser ? `${author.toString()} ` : ""
    
    return `${checkEmoji(ref.client, emoji)} **|** ${user}${content}`  
  }
  
  static parseMessage(content, options) {
    if (typeof content === "object") options = content, content = (options.content || null)
    var data = {content: content, embeds: [], buttons: [], components: [], files: [], menus: []}
    if (options) {
      data = Object.assign({}, data, options);
    }
    
    if (Array.isArray(options)) {
      for (var it in options) {
        it = options[it]
        
        var words = require("util").inspect(it).split(" ")
        switch (words[0]) {
          case 'MessageAttachment':
            data.files.push(it)
          break;
          case 'MessageEmbed':
            data.embeds.push(it)
          break;
          case 'MessageActionRow':
            data.components.push(it)
          break;
          case 'MessageSelectMenu': 
            data.menus.push(it)
          break;
          case 'MessageButton':
            data.buttons.push(it)
          break;
        }
      }
    }
    
    var words = require("util").inspect(options).split(" ")
    switch (words[0]) {
      case 'MessageAttachment':
        data.files.push(options)
        break;
      case 'MessageEmbed':
        data.embeds.push(options)
        break;
      case 'MessageActionRow':
        data.components.push(options)
        break;
      case 'MessageSelectMenu': 
        data.menus.push(it)
        break;
      case 'MessageButton':
        data.buttons.push(options)
        break;
    }
    
    if (data.menus && data.menus.length !== 0) data.components.push({type: "ACTION_ROW", components: data.menus})
    if (data.buttons && data.buttons.length !== 0) data.components.push({type: "ACTION_ROW", components: data.buttons})
    
    return data
  }
  
  static buildFancy(reference, content, emoji, mentionUser, options) {
    if (typeof emoji == "boolean") mentionUser= emoji, emoji = "🔹"
    if (typeof mentionUser !== "boolean") options= mentionUser, mentionUser=true;
    if (typeof emoji === "object") mentionUser=true, options=emoji, emoji= "🔹"
    if (typeof content === "object") options = content, content = options.content
    if (content == undefined) content = ""
    
    if (options?.string) content = options.string
    if (options?.emote) emoji = options.emote
    if (options?.mentionUser) mentionUser = options.mentionUser
    
    var mention = reference.author ? `<@!${reference.author?.id}> ` : `<@!${reference.user?.id}> `
    var authorMention = mentionUser ? mention : ``
    
    var emojiParsed = /(%..%..%..(%..|)?)/ig.test(reference.client.emojis.resolveIdentifier(emoji)) ? 
        emoji : (isNaN(emoji) ? Util.parseEmoji(emoji).id : emoji)
    
    return Replies.parseMessage(`${checkEmoji(reference.client, emojiParsed)} **|** ${authorMention}${content}`, options)
  }

  static buildFancySend(reference, content, emoji, mentionUser, options) {
    if (mentionUser == null) mentionUser = false
    if (emoji == null) emoji == false;
    if (typeof emoji == "boolean") mentionUser= emoji, emoji = "🔹";
    
    if (typeof mentionUser == "object") {
      if (!mentionUser?.id && !mentionUser?.tag) options= mentionUser, mentionUser= false;
      else mentionUser= mentionUser;
    }

    if (typeof mentionUser == "string" && mentionUser.match(/[0-9]*/ig)) 
      mentionUser= reference.client.users.cache.get(mentionUser);

    if (typeof emoji === "object") {
      if (emoji?.id && emoji?.tag) mentionUser=emoji, emoji= "🔹";
      else mentionUser = false, options= emoji, emoji= "🔹";
    }

    if (typeof content === "object") options = content, content = options.content;
    if (content == undefined) content = "";

    if (options?.string) content = options.string;
    if (options?.emote) emoji = options.emote;
    if (options?.mentionUser) mentionUser = options.mentionUser

    var authorMention = mentionUser ? `${mentionUser.toString()} ` : ``;
    var emojiParsed = /(%..%..%..(%..|)?)/ig.test(reference.client.emojis.resolveIdentifier(emoji)) ? 
        emoji : (isNaN(emoji) ? Util.parseEmoji(emoji).id : emoji)

    var newData = Replies.parseMessage(`${checkEmoji(reference.client, emojiParsed)} **|** ${authorMention}${content}`, options)

    return reference.send(newData)
  }
}
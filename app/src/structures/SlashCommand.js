const ClassUtil = require('../utils/Util');
const { Util } = require('discord.js')
const Discord = require('discord.js')

module.exports = class SlashCommands {
  constructor(client, options) {
    this.client = client
    
    var onlyGuild = (options.onlyGuild || options.onlyguild || options.onlyGuilds || options.onlyguilds)
    
    this.config = {
      onlyDevs: options.onlyDevs || false,
      onlyStaff: options.onlyStaff || false,
      onlyGuild: onlyGuild || false,
      devGuild: options.devGuild || false,
      subCommand: options.subCommand || false,
      command: options.command || false,
      localeName: options.localeName || options.name
    }

    this.config.onlyguilds = this.config.onlyGuild;
    this.config.onlyguild = this.config.onlyGuild;
    this.config.onlyGuilds = this.config.onlyGuild;
    
    var description = options.description || "This command has no description defined!"
    
    this.help = {
			name: options.name || null,
      description: ClassUtil.fancySplit(description, 97),
      options: options.options || [],
      type: options.type || 1
		}
    
    this.data = {
      name: this.help.name,
      description: this.help.description,
      options: this.help.options,
      type: this.help.type
    }
    
    this.conf = this.config
  }
  
  getSubCommand(interaction) {
    return this.client.subCommands.find(it => it.help.name == interaction.options._subcommand)
  }
  
  getBaseCommand(interaction) {
    return this.client.slashCommands.get(this.conf.command)
  }
  
  getLinkButton(url, t, item="link", emoji) {
    var button = new Discord.MessageButton()
      .setLabel(`Abrir ${item} no navegador`)
      .setStyle('LINK')
      .setURL(url);
    
    if (emoji) 
      button.setEmoji(emoji)
    
    return button
  }
  
  verifyGuild(context) {
    if (!context.guild) 
    return context.ffReply("Este comando funciona apenas em servidores.. E infelizmente eu acho que isto não é um servidor", "813179670270967819", {ephemeral: true})
  }
  
  createCommandComponent(component, options= {extras: false}) {
    var userID = options.userID || null, extra = options.extras ? options.extras.join(":")+":" : ""
    var name = this.config.subCommand ? `${this.config.command}(${this.help.name})` : `${this.help.name}`
    
    component.setCustomId(`command:${name}:${extra}${userID}`)
  }
  
  async findTextImage(channel, option) {
    var allowedFormats = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi
    
    if (option) {
      if (option.match(allowedFormats)) {
        return option
      }
    } else {
      var messages = await channel.messages.fetch({limit: 20})
      var message = messages.find(it => it.attachments && it.attachments.some(it => it.url.match(allowedFormats)))
      
      return message?.attachments?.first()?.url
    }
  }
  
  async findImage(channel, option) {
    var allowedFormats = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi
    
    if (option) {
      if (option.match(/<@!?[0-9]*>/ig)) {
        var user = await channel.client.users.fetch(option)

        return await channel.client.users.cache.get(user)?.getAvatar()
      }
      
      if (option.match(/(<a?:.*:[0-9]*>)/ig)) {
        if (Util.parseEmoji(option).id !== null) {
          return `https://cdn.discordapp.com/emojis/${Util.parseEmoji(option).id}.${Util.parseEmoji(option).animated ? 'gif' : 'png'}`
        }
      }
      
      if (this.client.emojis.resolveIdentifier(option).includes("%")) {
        return `https://twemoji.maxcdn.com/2/72x72/${option.codePointAt(0).toString(16)}.png`
      }
      
      if (option.match(allowedFormats)) {
        return option
      }
    } else {
      var messages = await channel.messages.fetch({limit: 20})
      var message = messages.find(it => it.attachments && it.attachments.some(it => it.url.match(allowedFormats)))
      
      return message?.attachments?.first()?.url
    }
  }
}
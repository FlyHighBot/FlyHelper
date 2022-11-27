const { Message, MessageEmbed, User, Guild, Client, GuildMember } = require("discord.js");
const { Interaction, Constants, Collection, UserManager } = require("discord.js");
const { checkEmoji } = require('../utils/checkEmoji.js');
const ClassUtil = require('../../src/utils/Util.js');
const Replies = require('./Replies')

module.exports = class ProtoTypes {
  static start() {

    //Load all replies
    Replies.start()
    
    //OnlyDevs
    User.prototype.isDev = function() {
      if (this.id === process.env.OWNER_ID) return true;
      var guild = this.client.guilds.cache.get(process.env.COMMUNITY_GUILD)
      if (guild.members.cache.has(this.id)) {
        var member = guild.members.cache.get(this.id)
        if (member.roles.cache.has("697414895834234892")) return true;
      }
      
      return false;
    }
    
    User.prototype.isStaff = function() {
      if (this.id === process.env.OWNER_ID) return true;
      var guild = this.client.guilds.cache.get(process.env.COMMUNITY_GUILD)
      
      if (guild.members.cache.has(this.id)) {
        var member = guild.members.cache.get(this.id)
        if (member.roles.cache.has("692487651512811530")) return true;
      }
      
      return false;
    }
    
    Client.prototype.checkEmoji = function(emojiID) {
      let messageEmoji, emojiCheck = this.emojis.cache.get(emojiID)
      if (emojiCheck == undefined) {
        const identifier = this.emojis.resolveIdentifier(emojiID)
        if (identifier.includes("%")) {
          messageEmoji = emojiID;
        } else {
          messageEmoji = "🐛"
        }
      } else {
        messageEmoji = emojiCheck.toString();
      }
      return 
    }
    
    Guild.prototype.getMember = function(User) {
      let guildMemberResolvable
      if (!isNaN(User)) guildMemberResolvable = User.toString()
      if (typeof User === "object") guildMemberResolvable = User.id
            
      if (!this.members.cache.has(guildMemberResolvable)) return false
      
      return this.members.cache.get(guildMemberResolvable)
    }
    
    User.prototype.getAvatar = function(options) {
      if (this.avatar !== null) {
        const format = this.avatar && this.avatar.startsWith("a_") ? ".gif?size=2048" : ".png?size=2048";
        
        return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}${format}`
      }
    }

    MessageEmbed.prototype.addField = function (name, value, inline) {
      if (typeof value !== "string") value = `${value}`
      
      return this.addFields({ name, value, inline });
    }

    Collection.prototype.array = function() {
      return [...this.values()]
    }

    Interaction.prototype.isSubCommand = function() {
      return this.options._subcommand ? true : false
    }
    
    Interaction.prototype.isSlashCommand = function() {
      return this.type === Constants.InteractionTypes[2] && typeof this.targetId === 'undefined';
    }
    
    Interaction.prototype.isCommand = function() {
      return this.type === Constants.InteractionTypes[2];
    }

    Interaction.prototype.loadTarget = async function() {
      try {
        switch (this.targetType) {
          case 'USER':
            await this.client.users.fetch(this.targetId)
            
            this.target = this.client.users.cache.get(this.targetId)
            break;
          case 'MESSAGE':
            this.target = await this.client.channels.cache.get(this.channelId).messages.fetch(this.targetId)
            break;
        }
        
        return true;
      } catch(err) {
        return new Error(`[NELLY-UTIL] This target as not been fetched!\n${err}`)
      }
    } 
    
    UserManager.prototype.add = function (data, cache = true, { id, extras = [] } = {}) {
      const existing = this.cache.get(id ?? data.id);
      if (cache) existing?._patch(data);
      if (existing) return existing;
      
      const entry = this.holds ? new this.holds(this.client, data, ...extras) : data;
      if (cache) this.cache.set(id ?? entry.id, entry);
      return entry;
    }

    Guild.prototype.verifyAndGetMember = async function(User) {
      var member = this.members.cache.get(User) || null;
      
      if (!member) {
        try {
          member = await this.members.fetch(User)

          return member
        } catch(err) {
          return null;
        }
      }

      return member
    }
  }
}
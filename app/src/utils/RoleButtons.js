const Constants = require('./Constants.js')
const Discord = require("discord.js")
const Util = require('./Util.js')

module.exports = class RoleButtons {
  static registerButtons(guild) {
    if (guild.id == "851673486727839795") return this.robloxFly()
    if (guild.id == process.env.COMMUNITY_GUILD) return this.redefly()
    if (guild.id == process.env.SUPPORT_GUILD) return this.flySupport()
  }
  
  static redeFly() {
    //=== [ NOTIFY ROLES ] ===//
    var notifyPolls = this.buttonRole("638505187178184704", "815346885811372033", "Enquetes", {
      description: "Seja notificado sempre que uma nova enquete for feita!"
    })
    
    var notifyTweets = this.buttonRole("638848018887475233", "826436216588337182", "Tweets", {
      description: "Não perca nenhuma nova atualização na rede social do passarinho azul!"
    })
    
    var notifyNews = this.buttonRole("638505051895365632", "860648132684939275", "Notícias", {
      description: "Quer ficar ligadinho nas notícias do Mundo Geek e otaku? Receba tudo de primeira mão com este cargo!"
    })
    
    
    //=== [Icon Roles] ===//
    var CatPaiaço = this.buttonRole("893841428646596608", "891838748520751145", null)
    var RageEmote = this.buttonRole("893841973440548864", "853228348549103626", null)
    var Inemafoo = this.buttonRole("893841975000858654", "893843817285967942", null)
    var FlyReading = this.buttonRole("893841973771915326", "826430254084128829", null)
    var WumpusBombado = this.buttonRole("893841982756098088", "854075784011841546", null)
    var Amogus = this.buttonRole("893843973741891636", "893848526147162162", null)
    var Floopa = this.buttonRole("893844221738516540", "852291994541096979", null)
    var MariaCururu = this.buttonRole("893844388252385351", "893849036333932555", null)
    var GamatatsuiWtf = this.buttonRole("893844603197849621", "893849214117879809", null)
    var Tamioka = this.buttonRole("893844675490893834", "826471477976760390", null)
    var CatBan = this.buttonRole("908469544035704892", "908473117301694464", null)
    var CaranguejoDeMinas = this.buttonRole("908471032401264731", "908473737144303657", null)
    var Chad = this.buttonRole("908471073861935104", "908473411460825148", null)
    var WtfCat = this.buttonRole("908471113544237076", "908474529083453491", null)
    var Hulk = this.buttonRole("908471137682485398", "826580199491633182", null)
    
    //=== [ GAMING ROLES ] ===
    var CacadordeWaifu = this.buttonRole("624678374299664395", "❤️", null)
    var JogadorMyuu = this.buttonRole("529331747465199626", "826452505193742356", null)
    var Gartic = this.buttonRole("618919161833455626", "606529423822553110", null)
    var Minerador = this.buttonRole("728807244904398899", "826436941927022612", null)
    var Ve7sGame = this.buttonRole("742785303323869186", "💁", null)
    var Unbelieva = this.buttonRole("846752835382411266", "🏛️", null)
    var RpgBot = this.buttonRole("845768645913214976", "🏹", null)
    
    //=== [ LISTS ] ===//
    var notify = new Array(notifyPolls, notifyTweets, notifyNews)
    var icons = new Array(CatPaiaço, RageEmote, Inemafoo, FlyReading, WumpusBombado, Amogus, Floopa, MariaCururu, GamatatsuiWtf, Tamioka, CatBan, CaranguejoDeMinas, Chad, WtfCat, Hulk)
    var games = new Array(CacadordeWaifu, JogadorMyuu, Gartic, Minerador, Ve7sGame, Unbelieva, RpgBot)
    
    //=== [ CLASSES ] ===//
    var notifyRoles = this.buttonType(
      notify, "Cargos de Notificação", null, "https://cdn.discordapp.com/emojis/826430829181141062.png", 
      "{emoji} **|** Ótimo! Agora com {role} você sempre será notificado quando houver algo novo!",
      "<:fly_sob:826430408173813820> **|** Eu não acredito! Achei que você queria ver as novidades, achei que éramos amigos .. Mas se precisar, fico aqui!",
    )
    
    var iconsRoles = this.buttonType(
      icons, "Ícones Personalizados", `Escolha um ícone personalizado que irá aparecer ao lado do seu nome aqui no servidor! O ícone personalizado irá substituir qualquer outro ícone que você possui!
      \n**Apenas disponível para usuários são <@&590517727190581266> no servidor ou <@&666410258889179167>!** Ficou interessado? Então [clique aqui](https://discord.com/channels/417061847489839106/826348023453843456/832945759199428609)! Ou, se preferir, seja mais ativo no servidor para chegar no nível 10!`,
      "https://cdn.discordapp.com/emojis/826415473981390848.png", "{emoji} **|** Agora você está bem estiloso para conversar no chat! Sempre que quiser venha aqui trocar seu ícone!",
      "<:role:860663445825388554> **|** Ícone removido com sucesso! Agora você pode escolher outro se quiser!", { removeOtherRole: true, onlyRoles: ["666410258889179167", "590517727190581266"]}
    )
    
    var gamesRoles = this.buttonType(
      games, "Jogos do Discord", `Inicie sua jornada em bots que colocamos aqui no nosso servidor, se aventure, se divirta e jogue com outros membros!
      \n**Cada cargo aqui libera canais novos** para que você interaja com os bots de diversão do servidor! Esses bots trazem consigo jogos com temáticas, jogabilidade e complexidades diferentes. O que acha de experimentar?`,
      "https://cdn.discordapp.com/emojis/826423836965601301.png", "{emoji} **|** Agora você pode usufruir e se divertir com os canais que foram liberados!",       "<:fly_sob:826430408173813820> **|** Talvez você não tenha gostado desse jogo! Ok, ok... Eu entendo, mas se você quiser jogar algo novamente eu estou aqui!",
    )
    
    return [
      notifyRoles,
      iconsRoles,
      gamesRoles
    ]
  }

  static flySupport() {
    //=== [ NOTIFY ROLES ] ===//
    var news = this.buttonRole("769895515860631583", {name: "fly_fine", id: "869310000768614400"}, "Notificar Novidades", {
      description: "Fique ligadinho em todas as novidades do FlyHigh, para não perder nenhuma funcionalidade incrível!"
    })
    
    var wip = this.buttonRole("935207422547595284", {name: "fly_fixit", id: "826430206487166996"}, "Novidades WIP", {
      description: "| Fique de olho nas mudanças que estão chegando ao FlyHigh antes de todo mundo!"
    })

    //=== [ LISTS ] ===//
    var notify = new Array(news, wip)    
    
    var notifyRoles = this.buttonType(
      notify, "Cargos de Notificação", null, "https://cdn.discordapp.com/emojis/826430829181141062.png", 
      "{emoji} **|** Exelente! Agora com {role} você sempre será notificado sempre haver algo novo!",
      "<:fly_sob:826430408173813820> **|** Eu não acredito! Achei que você queria ver as novidades, achei que éramos amigos.. Mas se precisar, eu fico aqui!"
    )
    
    return [
      notifyRoles
    ]
  }
  
  static robloxFly() {
    //=== [ REGIONAL ROLES ] ===//
    var english = this.buttonRole("854490973971283968", "🇧🇷", "Portuguese")
    var portuguese = this.buttonRole("854491481917489163", "🇺🇸", "English")
    
    //=== [ NOTIFY ROLES ] ===//
    var inserver = this.buttonRole("891648381045325855", {name: "fly_reading", id: "826430254084128829"}, "Discord Updates", {
      description: "Stay tuned for all the news here from our Discord (<#853949428637237278>), so you don't miss a thing!"
    })
    var wip = this.buttonRole("891649001127022603", {name: "fly_fixit", id: "826430206487166996"}, "WIP Updates", {
      description: "Keep a close eye on the changes that are coming to our games! Peerks will be sent on a channel that only people with this role can see!"
    })
    var news = this.buttonRole("891649002985123900", {name: "fly_thumbsup", id: "826415473969070090"}, "Games News", {
      description: "Receive notifications of all new updates and changes to our games that will be sent out in <#853453645805912094>! Yay, you will like to be informed."
    })
    var stats = this.buttonRole("891649005954678784", {name: "fly_fine", id: "869310000768614400"}, "Games Status", {
      description: "Don't just hang around without knowing why the server is down, or why you can't log into the server, get notifications of the status of our games!"
    })

    //=== [ LISTS ] ===//
    var languages = new Array(english, portuguese)
    var notify = new Array(inserver, wip, news, stats)    
    
    //=== [ CLASSES ] ===//
    var regionalRoles = this.buttonType(languages, "Regional Roles", 
      `Choose a region position so you can get better support, talk to people who speak your language, and many others.
      
      **Remembering that you cannot have two region positions at the same time! We will do this to avoid confusion.**`,
      "https://cdn.discordapp.com/emojis/826430254084128829.png",
      "{emoji} **|** Ready! You will now have access to support in {label}!",
      "<:fly_comfy:826415473922539580> **|** Wait a minute, you'll lose access to the support channels, ok... But if you want I'll be here.",
      { removeOtherRole: true}
    )
    
    var notifyRoles = this.buttonType(
      notify, "Notify Roles", null, "https://cdn.discordapp.com/emojis/826430829181141062.png", 
      "{emoji} **|** Excellent! Now with {role} you will be notified whenever there is something new!",
      "<:fly_sob:826430408173813820> **|** I don't believe! I thought you wanted to see the news, I thought we were friends.. But if you need to, I'll stay here!"
    )
    
    return [
      regionalRoles,
      notifyRoles
    ]
  }
  
  static getMessages(classes) {
    return classes.map(it => {
      return {
        embeds: [this.createEmbed(it.name, it.description, it.image)],
        components: this.generateRows(it.buttons)
      }
    })
  }
  
  static buttonRole(id, emoji, string, options) {
    var button = new Discord.MessageButton()
      .setCustomId(`broles:${id}`)
      .setStyle("SECONDARY")
      .setEmoji(emoji)

    if (string) button.setLabel(string)
    button.options = options
    return button;
  }
  
  static generateRows(buttons) {
    var buttonsPerRows = Util.chunk(buttons, 5)
    
    return buttonsPerRows.map(it => {
      return new Discord.MessageActionRow()
        .addComponents(it)
    })
  }
  
  static findClass(bclass, customID) {
    return bclass.find(it => it.buttons.some(it => it.customId == customID))
  }
  
  static buttonType(buttons, name, description, image, message, removeMessage, options) {
    if (buttons.every(it => it.options?.description)) {
      description = buttons.map(it => `${this.getRoleEmoji(it.emoji)} **${it.label}:** ${it.options.description}`).join("\n\n")
    }
    
    return {
      name: name,
      description: description,
      image: image,
      message: message,
      removeMessage: removeMessage,
      buttons: buttons,
      options: options
    }
  }
  
  static createEmbed(title, description, image) {
    return new Discord.MessageEmbed()
      .setColor(Constants.FLY_COLOR)
      .setDescription(description)
      .setThumbnail(image)
      .setTitle(title)
  }
  
  static applyPlaceholder(content, interaction, role) {
    return content
      .replace(new RegExp("{user}", "ig"), `${interaction.user.username}`)
      .replace(new RegExp("{@user}", "ig"), `${interaction.user.toString()}`)
      .replace(new RegExp("{user\.discriminator}", "ig"), `${interaction.user.discriminator}`)
      .replace(new RegExp("{user\.tag}", "ig"), `${interaction.user.tag}`)
      .replace(new RegExp("{user\.id}", "ig"), `${interaction.user.id}`)
      .replace(new RegExp(("{staff(\.username)?}"), "i"), `${interaction.user.username}`)
      .replace(new RegExp("{emoji}", "ig"), `${this.getRoleEmoji(interaction.component.emoji)}`)
      .replace(new RegExp("{label}", "ig"), `${interaction.component.label}`)
      .replace(new RegExp("{customID}", "ig"), `${interaction.component.customId}`)
      .replace(new RegExp("{role}", "ig"), `<@&${role}>`)
  }
  
  static getRoleEmoji(emote) {
    return [
      `${emote.animated ? "<a" : ""}`,
      `${emote.id ? (emote.animated ? ":" : "<:") : ""}`,
      `${emote.name}`,
      `${emote.id ? `:${emote.id}>`: ""}`
    ].join("")
  }
}
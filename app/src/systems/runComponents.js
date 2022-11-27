module.exports = {
  run: async (client, interaction) => {
    if (!interaction.isMessageComponent()) return;
    if (!interaction.customId?.includes("command:")) return;
          
    var userId = interaction.customId.split(":")[interaction.customId.split(":").length-1]
    var command = interaction.customId.split(":")[1]

    var subCommand = interaction.customId.match(/\(.*\)/) || false;
    var subGroup = subCommand[0]?.replace(/[()]/ig, "").includes("-")
    
    if (subCommand) command = command.split("(")[0], subCommand = subCommand[0].replace(/[()]/ig, "")
    if (subGroup) subGroup = subCommand.split("-")[1], subCommand = subCommand.split("-")[0]
    
    var cmd = subCommand ?  
        (subGroup ? 
         client.groupCommands.find(it => it.conf.command == command && it.conf?.subCommandGroup == subGroup && it.help.name == subCommand) :
         client.subCommands.find(it => it.help.name == subCommand && it.conf.command === command)) : 
        client.slashCommands.get(command)
    
    var context = {
      firstEmbed: interaction.message.embeds[0],
      user: client.users.cache.get(userId) || null,
      author: client.users.cache.get(userId) || null,
      chunks: interaction.customId.split(":"),
      channel: interaction.channel,
      message: interaction.message,
      guild: interaction.guild,
      commandName: command,
      client: client,
      command: cmd
    }
        
    client.context = context, client.owner = client.users.cache.get("361977144445763585");
    client.command = cmd, interaction.context = context;

    try {
      await cmd.runComponents(client, interaction, context)
    } catch(err) {
      console.error(err)
      return interaction.ffReply(`Alguma coisa deu extremamente errada ao executar este comando... Desculpe pela inconveniência. \`${err}\``, "858430303143591936", {edit: (interaction.deferred || interaction.replied), ephemeral: true })
        .catch(e => interaction.channel.ffSend(`Alguma coisa deu extremamente errada ao executar este comando... Desculpe pela inconveniência. \`${err}\``, "858430303143591936", context.author.id))
    }
  },
  
  config: {
    "events": ["interactionCreate"]
  }
}

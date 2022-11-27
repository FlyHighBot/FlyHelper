module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;
  
  var cmd = client.slashCommands.get(interaction.commandName)

  if (interaction.isSubCommand()) 
    cmd = client.subCommands.find(it => it.help.name == interaction.options._subcommand)
  
  var context = {
    message: interaction.message || null,
    guild: interaction.channel.guild || null,
    channel: interaction.channel || null,
    args: this.message ? this.message.content : null,
    author: interaction.user
  }
  
  if (!cmd) return interaction.ffReply("Acho que isso não é um comando...", "813179670270967819")

  if (cmd.conf.onlyGuilds && !interaction.inGuild()) 
    return interaction.ffReply("Este comando funciona apenas em servidores.. E infelizmente eu acho que isto não é um servidor", "858430303143591936")

  if (cmd.conf.onlyDevs && !context.author.isDev()) 
    return interaction.ffReply("Apenas pessoas especiais podem utilizar este comando", "858430303143591936", {ephemeral: true})
  
  if (cmd.conf.onlyStaff && !context.author.isStaff())
    return interaction.ffReply("Apenas pessoas especiais podem utilizar este comando", "858430303143591936", {ephemeral: true})  

  if (interaction.isContextMenu()) await interaction.loadTarget()

  client.command = cmd, client.owner = client.users.cache.get("361977144445763585"), client.invite = client.generateInvite({scopes: ["applications.commands", "bot"]}), client.context= context
  
  try {
    await cmd.run(client, interaction, context)
    if (context?.channel.type == "dm") console.log('[CommandLog]', `| [User] ${context.author.tag} - (${context.author.id}) executou ${cmd.help.name}.js`)
    if (context?.channel.type !== "dm") console.log('[CommandLog]', `| [User] ${context.author.tag} - (${context.author.id}) executou ${cmd.help.name}.js [Guild] ${interaction.guild.name} - (${interaction.guild.id}) - ${interaction.channel.name} (${interaction.channel.id})`)
  } catch(err) {
    return interaction.ffReply(`Alguma coisa deu extremamente errada ao executar este comando... Desculpe pela inconveniência. \`${err}\``, "858430303143591936", {edit: interaction.deferred})
      .catch(e => interaction.channel.ffSend(`Alguma coisa deu extremamente errada ao executar este comando... Desculpe pela inconveniência. \`${err}\``, "858430303143591936", context.author.id))
  }
}
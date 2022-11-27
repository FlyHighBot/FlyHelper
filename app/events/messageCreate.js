module.exports = async (client, message) => {
  
  let prefix = process.env.PREFIX, type = false

  if (message.guild && !message.guild.me.permissionsIn(message.channel).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
  if (message.author.bot || message.author.system) return;
  
  if (message.content === `${prefix}restart` && message.author.id === '361977144445763585') {
    await message.ffSend(`Reiniciando! Recarregando todos os meus comandos.`, "826413426100011028")
      .then(message => client.destroy()).catch(err => console.log(err))
      .then(() => client.login(process.env.AUTH_TOKEN)).catch(err => console.log(err))
      .then(() => message.ffSend(`Voltei! Iniciado com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`, "826414452969963520")).catch(err => console.log(err));
    console.log('[RESTART] Desconectando - Processo forçado pelo dono.');
    process.exit();
  }
  
  if (message.guild.id == process.env.SUPPORT_GUILD) type = "support"
  if (message.guild.id == process.env.COMMUNITY_GUILD) type = "community"

  message.guild.type = type, client.owner = client.users.cache.get("361977144445763585"), client.guild = client.guilds.cache.get("417061847489839106"), client.support = client.guilds.cache.get("769892417025212497"), client.prefix = process.env.PREFIX

  
  if (type && !message.content.toLowerCase().startsWith(prefix)) {
    if (!client.constants.ALLOWED_CHANNELS.includes(message.channel.id)) return;
    
    var responsesOlder = client.responses.filter(r => r.guilds.includes(type))
    var response = responsesOlder.find(response => response.config.regex.test(message.content))
    
    if (!response) return;
    if (message.author.isDev() && response.config.ignoreDevs) return;
    if (message.author.isStaff() && response.config.ignoreStaff) return;
    
    console.log('[ReponseLog]', `| [User] ${message.author.tag} - (${message.author.id}) run ${response.config.name}.js [Guild] ${message.guild.name} - (${message.guild.id}) - ${message.channel.name} (${message.channel.id})`)
    try {
      response.run(client, message)
    } catch(err) {
      return message.ffSend(`Alguma coisa deu extremamente errada ao executar este comando... Desculpe pela inconveniência. \`${err}\``, "813179670270967819");
    }
  }
  
  if (message.content.toLowerCase().indexOf(prefix) !== 0) return
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  let cmd = client.commands.get(command)
  
  if (!cmd) return
  
  message.command = cmd, message.cmd = cmd
    
  if (cmd.conf.onlyguilds && !message.guild) return message.channel.send("você não pode usar este comando em mensagens privadas!", "813179670270967819")
  try {
    cmd.run(client, message, args, cmd)
    if (message.channel.type == "dm") console.log('[CommandLog]', `| [User] ${message.author.tag} - (${message.author.id}) executou ${cmd.help.name}.js`)
    if (message.channel.type !== "dm") console.log('[CommandLog]', `| [User] ${message.author.tag} - (${message.author.id}) executou ${cmd.help.name}.js [Guild] ${message.guild.name} - (${message.guild.id}) - ${message.channel.name} (${message.channel.id})`)
  } catch(err) {
    return message.ffSend(`Alguma coisa deu extremamente errada ao executar este comando... Desculpe pela inconveniência. \`${err}\``, "813179670270967819");
  }
}
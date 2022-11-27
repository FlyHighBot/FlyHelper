module.exports = async (client) => {
  if (client.slashConfig.length !== 0) await client.application?.commands.set(client.slashConfig)
    .then(it => console.log("[Slash Commands]", `Comandos atualizados com sucesso!`))
  
  if (client.devCommands.length !== 0) await client.guilds.cache.get(process.SUPPORT_GUILD)?.commands.set(client.devCommands)
    .then(it => console.log("[Guild Slash Commands]", `Comandos atualizados com sucesso!`))

  await client.user.setPresence({ activities: [{name: 'e respondendo perguntas.', type: 'LISTENING'}] })
}
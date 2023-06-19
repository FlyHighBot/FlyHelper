 require('dotenv').config();                                   
require('./app/src/structures/ProtoTypes').start();   
  
const Discord = require('discord.js');
const flyClient = require('./app/flyClient.js')
const client = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES', 'GUILD_MEMBERS']})
const Constants = require("./app/src/utils/Constants")
const cron = require('cron');

client.commands = new Discord.Collection()
client.responses = new Discord.Collection()
client.slashCommands = new Discord.Collection()

client.guild = client.guilds.cache.get("417061847489839106")
client.support = client.guilds.cache.get("769892417025212497")
client.prefix = process.env.PREFIX

client.constants = Constants
require('discord-logs')(client);

const fly = new flyClient(client)
 fly.loadEvents()
 fly.loadCommands()
 fly.loadSlashs()
 fly.loadSubCommands()
 fly.loadResponses()
 fly.loadSystem()

client.on("error", (e) => console.error(e));

client.login(process.env.AUTH_TOKEN).then(() => console.log(`[CONNECT] ${client.user.username} is online.`)).catch((e) => console.log(`[ERROR] Failure connecting to Discord! ${e.message}!`))

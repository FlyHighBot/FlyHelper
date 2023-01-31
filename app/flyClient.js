const Discord = require("discord.js");
const fs = require('fs');
const { readdirSync } = require('fs')

module.exports = class flyClient{
  constructor(client) {
    this.client = client

    client.support = client.guilds.cache.get("696919133551591496")
    client.guild = client.guilds.cache.get("696919133551591496")
    client.owner = client.users.cache.get("557355064864538624")

    client.slashCommands = new Discord.Collection()
    client.constants = require('./src/utils/Constants')
    client.commands = new Discord.Collection()
    client.utils = require('./src/utils/Util')
    client.prefix = process.env.PREFIX
  }
  
  loadCommands(index = 'app/commands') {
    const cmdFiles = readdirSync(index);
    console.log(`[CMD-LOAD] O total de ${cmdFiles.length} comandos foram carregados!`);

    cmdFiles.forEach(folder => {
      readdirSync(`${index}/${folder}`).forEach(f => {
        try {
          const props = require(`./commands/${folder}/${f}`);
          if (f.split(".").slice(-1)[0] !== "js") return;
          console.log(`[CMD-LOADING] Carregando ${props.help.name}.js`);
          
          if (props.init) props.init(this.client);
          this.client.commands.set(props.help.name, props);
          
          if (props.help.aliases) {
            props.alias = true;
            props.help.aliases.forEach(alias => this.client.commands.set(alias, props));
          }
        } catch (e) {
          console.log(`[ERR] ${f} was not loaded correctly: ${e}`);
        }
      })
    });
  }
  
  loadEvents(index = 'app/events') {
    const evtFiles = readdirSync(index);
    console.log("[EVENTS]", `Carregando o total de ${evtFiles.length} eventos`);
    evtFiles.forEach(f => {
      const eventName = f.split(".")[0];
      const event = require(`./events/${f}`);

      this.client.on(eventName, event.bind(null, this.client));
    });
  }
  
  loadResponses(index = 'app/responses') {
    const cmdFiles = readdirSync(index);
    console.log(`[RESPONSES-LOAD] O total de ${cmdFiles.length} respostas foram carregadas!`);

    cmdFiles.forEach(folder => {
      readdirSync(`${index}/${folder}`).forEach(f => {
        try {
          const props = new (require(`./responses/${folder}/${f}`))(this);
          if (f.split(".").slice(-1)[0] !== "js") return;
          if (props.config.disable) return;
          
          console.log(`[RESPONSE] Carregando ${props.config.name}.js`);
          
          if (props.init) props.init(this.client);
          
          if (folder == "community") props.guilds = ["community"]
          if (folder == "support") props.guilds = ["community", "support"]
          
          this.client.responses.set(props.config.name, props);
        } catch (e) {
          console.log(`[ERR] ${f} was not loaded correctly: ${e}`);
        }
      })
    });
  }
  
  loadSubCommands(index = 'app/commands-slash') {
    const cmdFiles = readdirSync(index);
    var subCommands = []
    
    cmdFiles.forEach(async folder => {
      readdirSync(`${index}/${folder}`).forEach(it => {
        try {
          const props = new (require(`./commands-slash/${folder}/${it}`))(this);
          if (!props.conf.subCommand) return;
          if (props.init) props.init(this.client);

          console.log(`[SUB-COMMAND] Carregando sub commando ${props.conf.command} ${props.help.name}`)
          if (it.split(".").slice(-1)[0] !== "js") return;
          subCommands.push(props)
        } catch(err) {
          console.log(`[ERR] ${it} sub-command was not loaded correctyl: ${err}`)
        }
      })
    })
    
    this.client.subCommands = subCommands
  }
  
  async loadSlashs(index = 'app/commands-slash') {
    const cmdFiles = readdirSync(index);
    var commandsConfig = []
    var devCommands = []
    
    cmdFiles.forEach(async folder => {
      var files = await readdirSync(`${index}/${folder}`).forEach(async f => {
        try {
          const props = new (require(`./commands-slash/${folder}/${f}`))(this);
          if (f.split(".").slice(-1)[0] !== "js") return;
          if (props.conf.subCommand) return;

          console.log(`[SLASH-LOADING] Carregando ${props.help.name}.js`);
          await this.client.application?.fetch();
          
          if (props.init) props.init(this.client);
          if (!props.help.options) props.help.options = []
          if (this.client.subCommands && this.client.subCommands.every(it => it.conf.command == props.help.name)) {
            await this.client.subCommands.filter(it => it.conf.command == props.help.name).forEach(async (it) => {
              props.help.options.push(it.help)
            })
          }
          if (props.conf.devGuild) {
            devCommands.push(props.help)
            props.devCommand = true
          } else {
            commandsConfig.push(props.help)
          }
          
          this.client.slashCommands.set(props.help.name, props);
        } catch (e) {
          console.log(`[ERR] ${f} was not loaded correctly: ${e}`);
        }
      })
    });
    
    this.client.slashConfig = commandsConfig
    this.client.devCommands = devCommands
  }

  loadSystem(index = 'app/src/systems') {
    const sytFiles = readdirSync(index);
    console.log("[SYSTEMS]", `Carregando o total de ${sytFiles.length} eventos`);
    sytFiles.forEach(f => {
      const system = require(`./src/systems/${f}`);
      if (system.config.disable) return;

      if (system.config.events) {
        system.config.events.forEach((eventName) => {
          this.client.on(eventName, (...args) => {
            this.client.eventName = eventName
            
            system.run(this.client, ...args)
          });
        })
      }
    });
  }
};

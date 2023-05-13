const CronJob = require('cron').CronJob;
const { checkEmoji } = require('../utils/checkEmoji.js')

module.exports = {
  run: async (client) => {
    const job = new CronJob('0 */24 * * *', async () => {
      var channel = client.channels.cache.get("")
      channel.build(`${checkEmoji(client, "826414452969963520")} **|** Um outro dia nasce, staff do fly, que o hoje seja melhor que o ontem!`)
    }, null, true, 'America/Sao_Paulo')

    job.start()
  },
  
  config: {
    "events": ["ready"]
  }
}

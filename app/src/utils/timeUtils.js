const moment = require("moment");
const humanizeDuration = require("humanize-duration");

moment.locale('pt-BR')
require("moment-duration-format");

module.exports.getRelativeTime = (time, context, options={}) => {
  
  var timeDiff = time > context.createdAt ? time - context.createdAt : context.createdAt - time
  var config = { language: options?.locale, fallbacks: [context?.server?.locale, context?.guild?.preferredLocale.split('-')[0], "en"],
                round: true }
  
  if (options.limit) config.largest = options.limit
  if (options.weekToDay) config.units = ['y', 'mo', 'd', 'h', 'm', 's', 'ms']

  return humanizeDuration(timeDiff, config)
}

module.exports.flyTimeNow = (m, tV, f, monthsToYear = false) => {
  
  var order = tV > m.createdAt ? tV - m.createdAt : m.createdAt - tV
  var timeInEn = f ? moment.duration(parseInt(order), "ms").format(f) : moment.duration(parseInt(order), "ms").format()
  
  if (monthsToYear && f) {
    if (parseInt(timeInEn.split(" ")[0]) > 12) {
      timeInEn = moment.duration(parseInt(order), "ms").format("Y [years], M [months], d [days]")
    }
  }

  return timeInEn
}

module.exports.formatDate = (template, date) => {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}

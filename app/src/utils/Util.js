const { checkEmoji } = require('./checkEmoji.js')

module.exports = class Util {
  static getRandomValue(max){
    return Math.floor(Math.random()*max);
  }
  
  static getRandomValueOfObject(obj) {
    return obj[Object.keys(obj)[this.getRandomValue(Object.keys(obj).length)]]
  }
  
  static isJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  
  static arrayRemove(array, item) {
    const index = array.indexOf(item)
    if (index < 0) return;
    array.splice(index, 1)
    return array;
  }

  static chunk(array, chunkSize) {
    let newArray = [...array]
    newArray.forEach((e, i) => newArray.splice(i, 0, newArray.splice(i, chunkSize)));
    return newArray;
  }
  
  static async verifyArrayAndRemove(original, arrayRemove) {
    var array = [...original]
    for (const item in arrayRemove) {
      if (!array.includes(arrayRemove[item])) {
        continue;
      }
      
      const index = array.indexOf(arrayRemove[item])
      if (index < 0) {
        continue;
      }

      array.splice(index, 1);
    }
    return array;
  }
  
  static delay(delayInms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }
  
  static getEmoteURL(emoji) {
    if (emoji.identifier.includes("%")) {
      return `https://twemoji.maxcdn.com/2/72x72/${emoji.toString().codePointAt(0).toString(16)}.png`
    } else {
      return emoji.url
    }
  }
  
  static progressBar(amount, length) {
    var response = "█".repeat(amount) + ".".repeat(length - amount)
    return response;
  }
  
  static getPlaceholders(item, message, user, mod) {
    var guild = message.guild ? message.guild : null, completeString = item, channel = message.channel
    if (typeof item === "object") completeString = JSON.stringify(item)
      
    completeString = completeString
      .replace(new RegExp("{@user}", "ig"), `${user.toString()}`)
      .replace(new RegExp("{user\.discriminator}", "ig"), `${user.discriminator}`)
      .replace(new RegExp("{user\.tag}", "ig"), `${user.tag}`)
      .replace(new RegExp("{user\.avatar}", "ig"), `${user.getAvatar()}`)
      .replace(new RegExp("{user\.id}", "ig"), `${user.id}`)
      .replace(new RegExp(("{user(\.username)?}"), "ig"), `${user.username}`)

    if (message.guild) {
      completeString = completeString
        .replace(new RegExp("{#channel}", "ig"), `${channel.toString()}`)
        .replace(new RegExp("{channel\.id}", "ig"), `${channel.id}`)
        .replace(new RegExp("{channel(\.name)?}", "ig"), `${channel.name}`)
        .replace(new RegExp("{guild}", "ig"), `${guild.name}`)
        .replace(new RegExp("{guild\.id}", "ig"), `${guild.id}`)
        .replace(new RegExp("{guild\.size}", "ig"), `${guild.memberCount}`)
        .replace(new RegExp("{guild\.icon}", "ig"), `${guild.iconURL()}`)
    }

    if (mod) {
      completeString = completeString
        .replace(new RegExp("{reason}", "ig"), `${mod.reason}`)
        .replace(new RegExp("{punishment}", "ig"), `${mod.punishiment}`)
        .replace(new RegExp("{@staff}", "ig"), `${message.author.toString()}`)
        .replace(new RegExp("{staff\.discriminator}", "ig"), `${message.author.discriminator}`)
        .replace(new RegExp("{staff\.tag}", "ig"), `${message.author.tag}`)
        .replace(new RegExp("{staff\.avatar}", "ig"), `${message.author.getAvatar()}`)
        .replace(new RegExp("{staff\.id}", "ig"), `${message.author.id}`)
        .replace(new RegExp(("{staff(\.username)?}"), "i"), `${message.author.username}`)
    }
    
    if (typeof item === "object") return JSON.parse(completeString)
    
    return completeString
  }

  static rgbToHex(r, g, b) {
    return '#' + ((b | g << 8 | r << 16) | 1 << 24).toString(16).slice(1).toUpperCase();
  }
  
  static fancySplit(str, max) {
    if (str.length < max) return str;
    
    if (str.endsWith("`")) return `${str.substring(0, max+1)}\`...`
    
    return `${str.substring(0, max)}...`
  }
  
  static timeToMilliseconds(time) {
    time = time.replace(/(( )?se(c|g)und(os|o|s))/ig, "s")
    time = time.replace(/(( )?minut(os|o|e|es))/ig, "m")
    time = time.replace(/(( )?ho(ras|ra|urs|ur))/ig, "h")
    time = time.replace(/(( )?d(ias|ia|ays|ay))/ig, "d")    
      
    const timeUnits = time.replace(/[\d\s]/g, _ => '').toLowerCase().split('')
    const formats = ['d', 'h', 'm', 's']
    
    const isValid =  timeUnits.length === new Set(timeUnits).size && timeUnits.every((u, i, a) => formats.includes(u) && formats.indexOf(a[i-1]) < formats.indexOf(u))
    if (!isValid) return null
    
    const formatted = time.replace(/([a-zA-Z])/g, '$1 ').toLowerCase().trim().split(' ').filter(f => !!f)
    if (formatted.some(e => !/[0-9]/.test(e))) return null
    
    const invalid = { h:24, m:60, s:60 }
    for (const f of formatted) {
      const value = f.replace(/\D/g, '')
      const unit = f.replace(/\d/gi, '')
      
      if (value >= invalid[unit]) return null
    }
    
    const convertions = { d:86400000, h:3600000, m:60000, s:1000 }
    return formatted.reduce((acc, curr, i, a) => acc + parseInt(curr.substring(0, curr.length-1))*convertions[curr[curr.length-1]], 0)
  }
  
  static getTimestamp(idString) {
    const moment = require('moment')
    const id = BigInt.asUintN(64, idString);
    const dateBits = Number(id >> 22n);

    return (dateBits + 1420070400000);
  }

  static async translate(string, to, from="auto") {
    const axios = require("axios");
    
    try {
      return await axios.get(
        encodeURI(`http://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${string}&ie=UTF-8&oe=UTF-8`), 
        { responseType: 'array', headers: { 'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0" }}
      )
    } catch(err) {
      return {error: err, err: err}
    }
  }
  
  static factorial(number) {
    var value = number

    for (var i = number;;) {
      value-=1; i = i*value
      
      if (value == 1) {
        return i
        break;
      }
    }
  }
  
  static shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    
    return array;
  }

  static getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
}
module.exports.checkEmoji = (client, emojiID) => {
  let messageEmoji
  var emojiCheck = client.emojis.cache.get(emojiID)
  if (emojiCheck == undefined) {
    const identifier = client.emojis.resolveIdentifier(emojiID)
    if (identifier.includes("%")) {
      messageEmoji = emojiID;
    } else {
      messageEmoji = "🐛"
    }
  } else {
    messageEmoji = emojiCheck.toString();
  }
  return messageEmoji
}
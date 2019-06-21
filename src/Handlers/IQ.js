class IQHandler {

  handleCommand(data) {
    const {message, username} = data;
    if (message.toLowerCase().startsWith(pattern)) {
      return this.countIQ(username);
    }
    else {
      if (this.successor) {
        return this.successor.handleCommand(data)
      } else {
        return null
      }
    }
  }

  countIQ(username) {
    const unicodeLetters = username.split('').map(letter => letter.charCodeAt(0));
    const unicodeUsername = unicodeLetters.join('').split('').map(val => parseInt(val)).reduce((acc, val) => acc + val);
    return unicodeUsername;
  }
}

const pattern = '!iq';

module.exports = IQHandler;
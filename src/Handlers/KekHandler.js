class KekHandler {
  handleCommand(message) {
    if (message.toLowerCase() == 'kek') {
      return('LOL');
    }
    else {
      if (this.successor) {
        return this.successor.handleCommand(message)
      } else {
        return null
      }
    }
  }
}

module.exports = KekHandler;
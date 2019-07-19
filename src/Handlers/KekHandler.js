class KekHandler {
  handleCommand(data) {
    const {message} = data;
    if (message.toLowerCase() === 'kek') {
      return ('LOL');
    } else {
      if (this.successor) {
        return this.successor.handleCommand(data)
      } else {
        return null
      }
    }
  }
}

module.exports = KekHandler;

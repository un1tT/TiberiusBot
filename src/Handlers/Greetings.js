class GreetingHandler {
  handleCommand(data) {
    const {message} = data;
    if (greetings.includes(message.toLowerCase())) {
      return ('И тебе привет')
    } else {
      if (this.successor) {
        return this.successor.handleCommand(data)
      } else {
        return null
      }
    }
  }
}

const greetings = [
  'привет',
  'здравствуй',
  'hi',
  'hello'
];

module.exports = GreetingHandler;

class GreetingHandler {
  handleCommand(message) {
    if (greetings.includes(message.toLowerCase())) {
      return ('И тебе привет')
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

const greetings = [
  'привет',
  'здравствуй',
  'hi',
  'hello'
];

module.exports = GreetingHandler;
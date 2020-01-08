import { Handler } from './Handlers.interface';

export default class GreetingHandler implements Handler {
  successor = null;

  constructor(successor?: Handler) {
    this.successor = successor
  }

  handleCommand(data) {
    const {message} = data;
    if (greetings.includes(message.toLowerCase())) {
      return ('И тебе привет');
     } else {
       if (this.successor) {
         return this.successor.handleCommand(data);
       } else {
         return null;
       }
     }
  }
}

const greetings = [
  'привет',
  'здравствуй',
  'hi',
  'hello',
];

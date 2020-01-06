import { Handler } from './Handlers.interface';

export default class KekHandler implements Handler {
  successor = null;

  constructor(successor?: Handler) {
    this.successor = successor
  }

  handleCommand(data) {
    const {message} = data;
    if (message.toLowerCase() === 'kek') {
      return('LOL');
    } else {
      if (this.successor) {
        return this.successor.handleCommand(data);
      } else {
        return null;
      }
    }
  }
}

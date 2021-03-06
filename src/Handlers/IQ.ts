import { Handler } from './Handlers.interface';

export default class IQHandler implements Handler {
  successor = null;

  constructor(successor?: Handler) {
    this.successor = successor
  }

  handleCommand(data) {
    const {message, username} = data;
    if (message.toLowerCase().startsWith(pattern)) {
      const result = this.countIQ(username);
      const response = result < 25 ? 'Гений в чате! Pogchamp Твой результат - ' :
          result < 75 ? 'Интеллектуала видно издалека Kappa У тебя целых ' :
              result < 120 ? 'Надеюсь, школу получилось закончить... У тебя ' :
                  'Ты здесь чтобы деградировать, или что?)0) Твоя цифра ';
      return response + result;
    } else {
      if (this.successor) {
        return this.successor.handleCommand(data);
      } else {
        return null;
      }
    }
  }

  countIQ(username) {
    const unicodeLetters = username.split('').map(letter => letter.charCodeAt(0));
    return unicodeLetters.join('').split('').map(val => parseInt(val)).reduce((acc, val) => acc + val);
  }
}

const pattern = '!iq';

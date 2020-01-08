"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GreetingHandler {
    constructor(successor) {
        this.successor = null;
        this.successor = successor;
    }
    handleCommand(data) {
        const { message } = data;
        if (greetings.includes(message.toLowerCase())) {
            return ('И тебе привет');
        }
        else {
            if (this.successor) {
                return this.successor.handleCommand(data);
            }
            else {
                return null;
            }
        }
    }
}
exports.default = GreetingHandler;
const greetings = [
    'привет',
    'здравствуй',
    'hi',
    'hello',
];
//# sourceMappingURL=Greetings.js.map
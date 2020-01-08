"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KekHandler {
    constructor(successor) {
        this.successor = null;
        this.successor = successor;
    }
    handleCommand(data) {
        const { message } = data;
        if (message.toLowerCase() === 'kek') {
            return ('LOL');
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
exports.default = KekHandler;
//# sourceMappingURL=KekHandler.js.map
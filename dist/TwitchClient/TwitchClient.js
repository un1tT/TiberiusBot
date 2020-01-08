"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tmi = require('tmi.js');
const auth_1 = require("../constants/auth");
class TwitchClient {
    constructor(handlers) {
        this.handlers = [];
        this.client = null;
        const options = {
            options: {
                debug: true,
            },
            connection: {
                reconnect: true,
                maxReconnectAttempts: 5,
            },
            identity: {
                username: auth_1.USERNAME,
                password: auth_1.PASSWORD,
            },
            channels: auth_1.CHANNELS,
        };
        this.handlers = handlers;
        this.client = new tmi.client(options);
        this.client.connect();
        this.client.on('connected', (address, port) => {
            console.log(address, port);
        });
        this.client.on('join', (channel, username, self) => {
            if (self) {
                this.client.action(channel, 'Joined.')
                    .catch(err => console.log(err));
            }
        });
        this.client.on('chat', (channel, userstate, message, self) => __awaiter(this, void 0, void 0, function* () {
            if (self)
                return;
            const { 'display-name': username } = userstate;
            const data = {
                message,
                username,
            };
            const result = yield this.handlers[0].handleCommand(data);
            this.send(channel, result, username);
        }));
    }
    send(channel, message, username) {
        message && this.client.say(channel, `@${username} ${message}`);
    }
}
exports.default = TwitchClient;
//# sourceMappingURL=TwitchClient.js.map
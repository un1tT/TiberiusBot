const tmi = require('tmi.js');

import { USERNAME, CHANNELS, PASSWORD } from '../constants/auth';
import { TwitchClientInterface } from './TwitchClient.interface';

export default class TwitchClient implements TwitchClientInterface {
  handlers = [];
  client = null;

  constructor(handlers) {
    const options = {
      options: {
        debug: true,
      },
      connection: {
        reconnect: true,
        maxReconnectAttempts: 5,
      },
      identity: {
        username: USERNAME,
        password: PASSWORD,
      },
      channels: CHANNELS,
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

    this.client.on('chat', async (channel, userstate, message, self) => {
      if (self) return;
      const {'display-name': username} = userstate;
      const data = {
        message,
        username,
      };
      // Chain of responsibilities starts:
      const result = await this.handlers[0].handleCommand(data);
      this.send(channel, result, username);
    });
  }

  send(channel, message, username) {
    message && this.client.say(channel, `@${username} ${message}`);
  }
}

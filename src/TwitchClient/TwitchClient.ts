const tmi = require('tmi.js');

import { USERNAME, PASSWORD } from '../constants/auth';
import { TwitchClientInterface } from './TwitchClient.interface';
import { handlers } from '../constants/config'

export default class TwitchClient implements TwitchClientInterface {
  handlers = [];
  client = null;

  static createEntity(channels: string[]) {
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
      channels,
    };

    const client = new tmi.client(options);
    client.connect();

    client.on('connected', (address, port) => {
      console.log(address, port);
    });

    client.on('join', (channel, username, self) => {
      if (self) {
        client.action(channel, 'Joined.')
          .catch(err => console.log(err));
      }
    });

    client.on('chat', async (channel, userstate, message, self) => {
      if (self) return;
      const {'display-name': username} = userstate;
      const data = {
        message,
        username,
      };
      // Chain of responsibilities starts:
      const result = await handlers[0].handleCommand(data);
      result && client.say(channel, `@${username} ${result}`);
    });
  }
}

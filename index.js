const tmi = require('tmi.js');
const axios = require('axios');
class TiberiusBot {
  constructor() {
    const options = {
      options: {
        debug: true
      },
      connection: {
        reconnect: true,
        maxReconnectAttempts: 5
      },
      identity: {
        username: 'tiberius_bot',
        password: 'oauth:ovtbu076ngrm29uh4ldc7an0mrhbe3'
      },
      channels: ['un1t_tv']
    };

    const client = new tmi.client(options);
    client.connect();

    client.on('connected', (address, port) => {
      console.log(address, port);
    })


    client.on('join', (channel, username, self) => {
      if (self) {
        client.action(channel, 'Joined.')
          .catch(err => console.log(err));
      }
    });

    client.on('chat', (channel, userstate, message, self) => {
      if (self) return;
      this.getUserInfo(userstate['user-id']);
    })
  }

  getUserInfo(id) {
    axios.get(`https://api.twitch.tv/kraken/users/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
}
const bot = new TiberiusBot();


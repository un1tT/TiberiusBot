const tmi = require('tmi.js');
const axios = require('axios');
const {username, channels, password} = require('./constants/auth.js');
class TiberiusBot {
  
  constructor(handlers) {
    this.handlers = handlers;
    this.client = new tmi.client(options);
    this.client.connect();

    this.client.on('connected', (address, port) => {
      console.log(address, port);
    })

    this.client.on('join', (channel, username, self) => {
      if (self) {
        this.client.action(channel, 'Joined.')
          .catch(err => console.log(err));
      }
    });

    this.client.on('chat', async (channel, userstate, message, self) => {
      if (self) return;
      //console.log(userstate);
      const {'display-name':username} = userstate;
      //Chain of responsibilities starts:
      const result =  await this.handlers[0].handleCommand(message, username);
      this.send(channel, result, username);
    });
  }

  send(channel, message, username){
    message ? this.client.say(channel,`@${username} ${message}`) : null
  }
}

const options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true,
    maxReconnectAttempts: 5
  },
  identity: {
    username: username,
    password: password
  },
  channels: channels
};


module.exports = TiberiusBot;
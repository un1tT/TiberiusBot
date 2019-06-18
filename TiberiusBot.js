const tmi = require('tmi.js');
const axios = require('axios');
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
      const result =  await this.handlers[0].handleCommand(message)
      this.send(channel, result, username);
    })
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
    username: 'tiberius_bot',
    password: 'oauth:ovtbu076ngrm29uh4ldc7an0mrhbe3'
  },
  channels: ['un1t_tv']
};


module.exports = TiberiusBot;
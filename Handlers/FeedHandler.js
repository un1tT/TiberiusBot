const habrURL = require('../constants/urls');
const axios = require('axios');
const parser = require('xml2js').parseString;

class FeedHandler {
  handleCommand(message) {
    if (message.toLowerCase().startsWith(pattern)) {
      this.fetchRSS();  
      return ('Вот тебе новость')
     } 
     else {
       if (this.successor) {
         return this.successor.handleCommand(message)
       } else {
         return null
       }
     }
  }

  async fetchRSS(){
    const {data:xml} = await axios.get(habrURL);
    const feeds = parser(xml)
    const json = JSON.stringify(feeds)
    console.log(json);
    return rss; 
  }
}

const pattern = '!feed';

module.exports = FeedHandler;
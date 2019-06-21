const { habrRSS } = require('../constants/urls');
const axios = require('axios');
const parser = require('xml2js').parseString;
const util = require('util');
const getShortLink = require('../services/ShortLinkProvider');
const cutString = require('../services/stringCutter')

class FeedHandler {
  handleCommand(message) {
    if (message.toLowerCase().startsWith(pattern)) {
      return this.fetchRSS();
    }
    else {
      if (this.successor) {
        return this.successor.handleCommand(message)
      } else {
        return null
      }
    }
  }

  async fetchRSS() {
    const { data: xml } = await axios.get(habrRSS);
    let message = '';
    parser(xml, (err, result) => {
      //console.log(util.inspect(result, false, null))
      message = this.buildFeed(result.rss);
    });
    return message;
  }

  async buildFeed(rss) {
    const feeds = rss.channel[0].item;
    //Function random() returns number in range [0,1), so expression below provide number in range [0,amount of feeds in rss) 
    const randomNumber = Math.floor(Math.random() * (feeds.length - 1));
    const feedObj = feeds[randomNumber];
    const title = feedObj.title[0];
    const text = feedObj.description[0];
    const link = feedObj.link[0];
    const shortLink = await getShortLink(link);
    const trashLongFeed = `${title}. ${text}`;
    const longFeed = this.filterHtml(trashLongFeed);
    const shortFeed = cutString(longFeed);
    return (`${shortFeed} ${shortLink}`);
  }

  filterHtml(feed) {
    //const imgReg = /< img src =>\\w\">/;
    const tagReg = /<[^>]*>?/gm;
    const result = feed.replace(tagReg, '');
    //result = result.replace(imgReg, '');
    return result;
  }
}

const pattern = '!feed';

module.exports = FeedHandler;
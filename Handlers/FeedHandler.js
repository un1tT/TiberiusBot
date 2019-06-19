const habrURL = require('../constants/urls');
const axios = require('axios');
const parser = require('xml2js').parseString;
const util = require('util');

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
    const { data: xml } = await axios.get(habrURL);
    parser(xml, (err, result) => {
      //console.log(util.inspect(result, false, null))
      this.buildFeed(result.rss);
    });
    return ('Вот тебе новость');
  }

  buildFeed(rss) {
    const feeds = rss.channel[0].item;
    //console.log(feeds);
    //Function random() returns number in range [0,1), so expression below provide number in range [0,amount of feeds in rss) 
    const randomNumber = Math.floor(Math.random() * (feeds.length - 1));
    const feedObj = feeds[randomNumber];
    const title = feedObj.title[0];
    const text = feedObj.description[0];
    const link = feedObj.link[0];
    const trashFeed = `${title}. ${text} ${link}`;
    const feed = this.filterHtml(trashFeed);
    console.log(feed);
  }

  filterHtml(feed) {
    const imgReg = '/<img src =>\\w\">/';
    const tagReg = '</?\w+\s+[\^>]*>';
    let result = feed.replace(tagReg, '');
    result = result.replace(imgReg, '');
    return result;
  }
}

const pattern = '!feed';

module.exports = FeedHandler;
const {habrRSS} = require('../constants/urls');
const axios = require('axios');
const parser = require('xml2js').parseString;
const getShortLink = require('../services/ShortLinkProvider');
const cutString = require('../services/stringCutter')

class FeedHandler {
  handleCommand(data) {
    const {message} = data;
    if (message.toLowerCase().startsWith(pattern)) {
      return this.fetchRSS();
    } else {
      if (this.successor) {
        return this.successor.handleCommand(data)
      } else {
        return null
      }
    }
  }

  async fetchRSS() {
    const {data: xml} = await axios.get(habrRSS);
    let message = '';
    parser(xml, (err, result) => {
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
    const TAG_REGEXP = /<[^>]*>?/gm;
    return feed.replace(TAG_REGEXP, '');
  }
}

const pattern = '!feed';

module.exports = FeedHandler;

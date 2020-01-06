import axios from 'axios';
import { parseString } from  'xml2js';

import { HABR_RSS } from '../constants/urls';
import { getShortLink } from '../utils/ShortLinkProvider';
import { cutString } from '../utils/stringCutter';
import { Handler } from './Handlers.interface';

export default class FeedHandler implements Handler{
  successor = null;

  constructor(successor?: Handler) {
    this.successor = successor
  }

  handleCommand(data) {
    const {message} = data;
    if (message.toLowerCase().startsWith(pattern)) {
      return this.fetchRSS();
    } else {
      if (this.successor) {
        return this.successor.handleCommand(data);
      } else {
        return null;
      }
    }
  }

  async fetchRSS() {
    const { data: xml } = await axios.get(HABR_RSS);
    let message = '';
    await parseString(xml, (err, result) => {
      // @ts-ignore
      message = this.buildFeed(result.rss);
    });
    return message;
  }

  async buildFeed(rss) {
    const feeds = rss.channel[0].item;
    // Function random() returns number in range [0,1), so expression below provide number in range [0,amount of feeds in rss)
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

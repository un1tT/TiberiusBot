"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const xml2js_1 = require("xml2js");
const urls_1 = require("../constants/urls");
const ShortLinkProvider_1 = require("../utils/ShortLinkProvider");
const stringCutter_1 = require("../utils/stringCutter");
class FeedHandler {
    constructor(successor) {
        this.successor = null;
        this.successor = successor;
    }
    handleCommand(data) {
        const { message } = data;
        if (message.toLowerCase().startsWith(pattern)) {
            return this.fetchRSS();
        }
        else {
            if (this.successor) {
                return this.successor.handleCommand(data);
            }
            else {
                return null;
            }
        }
    }
    fetchRSS() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: xml } = yield axios_1.default.get(urls_1.HABR_RSS);
            let message = '';
            yield xml2js_1.parseString(xml, (err, result) => {
                message = this.buildFeed(result.rss);
            });
            return message;
        });
    }
    buildFeed(rss) {
        return __awaiter(this, void 0, void 0, function* () {
            const feeds = rss.channel[0].item;
            const randomNumber = Math.floor(Math.random() * (feeds.length - 1));
            const feedObj = feeds[randomNumber];
            const title = feedObj.title[0];
            const text = feedObj.description[0];
            const link = feedObj.link[0];
            const shortLink = yield ShortLinkProvider_1.getShortLink(link);
            const trashLongFeed = `${title}. ${text}`;
            const longFeed = this.filterHtml(trashLongFeed);
            const shortFeed = stringCutter_1.cutString(longFeed);
            return (`${shortFeed} ${shortLink}`);
        });
    }
    filterHtml(feed) {
        const TAG_REGEXP = /<[^>]*>?/gm;
        return feed.replace(TAG_REGEXP, '');
    }
}
exports.default = FeedHandler;
const pattern = '!feed';
//# sourceMappingURL=Feed.js.map
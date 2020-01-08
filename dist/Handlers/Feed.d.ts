import { Handler } from './Handlers.interface';
export default class FeedHandler implements Handler {
    successor: any;
    constructor(successor?: Handler);
    handleCommand(data: any): any;
    fetchRSS(): Promise<string>;
    buildFeed(rss: any): Promise<string>;
    filterHtml(feed: any): any;
}

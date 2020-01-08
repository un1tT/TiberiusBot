import { TwitchClientInterface } from './TwitchClient.interface';
export default class TwitchClient implements TwitchClientInterface {
    handlers: any[];
    client: any;
    constructor(handlers: any);
    send(channel: any, message: any, username: any): void;
}

import { TwitchClientInterface } from './TwitchClient.interface';
export default class TwitchClient implements TwitchClientInterface {
    handlers: any[];
    client: any;
    static createEntity(channels: string[]): void;
}

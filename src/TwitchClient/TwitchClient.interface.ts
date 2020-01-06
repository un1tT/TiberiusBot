import { Handler } from "../Handlers/Handlers.interface";

export interface TwitchClientInterface {
    handlers: Handler[],
    client: any // there is no typing for tmi client
}

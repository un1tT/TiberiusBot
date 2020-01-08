import { Handler } from "../Handlers/Handlers.interface";
export interface TwitchClientInterface {
    handlers: Handler[];
    client: any;
}

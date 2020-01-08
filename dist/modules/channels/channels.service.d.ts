import { Model } from 'mongoose';
import { Channel } from "./channels.model";
export declare class ChannelsService {
    private readonly channelModel;
    private clients;
    constructor(channelModel: Model<Channel>);
    createClient(name: string): void;
    disconnectClient(name: string): void;
    addChannel(name: string): Promise<string>;
    deleteChannel(name: string): Promise<void>;
    getChannels(): Promise<Channel[]>;
}

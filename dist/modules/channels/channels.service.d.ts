import { Model } from 'mongoose';
import { Channel } from "./channels.model";
export declare class ChannelsService {
    private readonly channelModel;
    constructor(channelModel: Model<Channel>);
    addChannel(name: string): Promise<string[]>;
    deleteChannel(name: string): Promise<void>;
    getChannels(): Promise<Channel[]>;
}

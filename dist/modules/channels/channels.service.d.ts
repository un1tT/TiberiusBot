import { Model } from 'mongoose';
import { Channel } from "./channels.model";
export declare class ChannelsService {
    private readonly channelModel;
    constructor(channelModel: Model<Channel>);
    addChannel(name: string): Promise<void>;
    deleteChannel(name: string): Promise<void>;
}

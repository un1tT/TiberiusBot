import { ChannelsService } from './channels.service';
export declare class ChannelsController {
    private readonly channelsService;
    constructor(channelsService: ChannelsService);
    getChannels(): Promise<import("./channels.model").Channel[]>;
    addChannel(channelName: string): void;
    removeChannel(channelName: string): void;
}

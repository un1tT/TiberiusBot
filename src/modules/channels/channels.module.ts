import { Module } from '@nestjs/common';

import { ChannelsController } from './channels.contoller';
import { ChannelsService } from './channels.service';

@Module({
    controllers: [ChannelsController],
    providers: [ChannelsService],
})
export class ChannelsModule {}

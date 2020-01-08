import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { ChannelsController } from './channels.contoller';
import { ChannelsService } from './channels.service';
import { ChannelSchema } from './channels.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Channel', schema: ChannelSchema}])],
    controllers: [ChannelsController],
    providers: [ChannelsService],
})
export class ChannelsModule {}

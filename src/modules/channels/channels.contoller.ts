import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get
} from '@nestjs/common';

import { ChannelsService } from './channels.service';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService ) {
  }

  @Get()
  getChannels(){
    return this.channelsService.getChannels();
  }

  @Post()
  addChannel(
    @Body('name') channelName: string,
  ) {
    this.channelsService.addChannel(channelName).then((name: string) => {
      this.channelsService.createClient(name);
    });
  }

  @Delete(':name')
  removeChannel(@Param('name') channelName: string) {
    this.channelsService.deleteChannel(channelName).then(() => {
      this.channelsService.disconnectClient(channelName);
    });
  }
}

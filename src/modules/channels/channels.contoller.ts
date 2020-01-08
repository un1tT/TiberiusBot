import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';

import { ChannelsService } from './channels.service';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService ) {
  }

  @Post()
  addChannel(
    @Body('name') channelName: string,
  ) {
    this.channelsService.addChannel(channelName);
  }

  @Delete(':name')
  removeChannel(@Param('name') channelName: string) {
    this.channelsService.deleteChannel(channelName);
  }
}

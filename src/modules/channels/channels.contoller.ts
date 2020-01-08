import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get
} from '@nestjs/common';

import { ChannelsService } from './channels.service';
import TwitchClient from "../../TwitchClient/TwitchClient";

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
    this.channelsService.addChannel(channelName).then((names: string[]) => {
      console.log('NAMES', names);
      const bot = TwitchClient.createEntity(names);
    });
  }

  @Delete(':name')
  removeChannel(@Param('name') channelName: string) {
    this.channelsService.deleteChannel(channelName);
  }
}

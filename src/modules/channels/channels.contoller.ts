import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';

import { ChannelsService } from './channels.service';

@Controller('products')
export class ChannelsController {
  constructor(private readonly productsService: ChannelsService) {
  }

  @Post()
  addChannel(
    @Body('name') channelName: string,
  ) {

  }

  @Delete(':name')
  removeChannel(@Param('name') channelName: string) {
    return null;
  }
}

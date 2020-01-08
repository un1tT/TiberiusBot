import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel } from "./channels.model";

@Injectable()
export class ChannelsService {
  constructor(@InjectModel('Channel') private readonly channelModel: Model<Channel>) {}

  async addChannel(name: string) {
    const newChannel = this.channelModel({ name });
    await newChannel.save();
  }


  async deleteChannel(name: string) {
    await this.channelModel.deleteOne({ name }, () => {
      console.log(`Channel ${name} has been deleted from db`)
    });
  }

}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel } from "./channels.model";

@Injectable()
export class ChannelsService {
  constructor(@InjectModel('Channel') private readonly channelModel: Model<Channel>) {
    channelModel.deleteMany({}, () => {
      console.log('channels collection is clear')
    });
  }

  async addChannel(name: string) {
    const newChannel = new this.channelModel({ name });
    return await newChannel.save((err) => {
      console.log(`Unable to add channel ${name} to db, ${err}`)
    }).then(() => [name]);
  }


  async deleteChannel(name: string) {
    await this.channelModel.deleteOne({ name }, () => {
      console.log(`Channel ${name} has been deleted from db`)
    });
  }

  async getChannels() {
    const channels = await this.channelModel.find();
    console.log('КАНАЛЫ', channels);
    return channels;
  }

}

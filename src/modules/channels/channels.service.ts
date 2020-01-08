import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Channel, ClientEntity} from "./channels.model";
import TwitchClient from "../../TwitchClient/TwitchClient";

@Injectable()
export class ChannelsService {
  private clients: ClientEntity[] = [];

  constructor(@InjectModel('Channel') private readonly channelModel: Model<Channel>) {
    channelModel.deleteMany({}, () => {
      console.log('channels collection is clear')
    });
  }

  createClient(name: string) {
    const newClient = {
      name,
      client: TwitchClient.createEntity([name])
    };
    this.clients.push(newClient);
  }

  disconnectClient(name: string) {
    const clientEntity = this.clients.find(({ name: clientName }) => clientName === name );
    clientEntity.client.disconnect();
  }

  async addChannel(name: string) {
    const newChannel = new this.channelModel({ name });
    return await newChannel.save((err) => {
      console.log(`Unable to add channel ${name} to db, ${err}`)
    }).then(() => name);
  }


  async deleteChannel(name: string) {
    await this.channelModel.deleteOne({ name }, () => {
      console.log(`Channel ${name} has been deleted from db`)
    });
  }

  async getChannels() {
    return await this.channelModel.find();
  }

}

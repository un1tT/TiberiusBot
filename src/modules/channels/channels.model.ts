import * as mongoose from 'mongoose';

export const ChannelSchema = new mongoose.Schema({
    name: {type: String, required: true},
});

export interface Channel {
  id: string;
  name: string;
}

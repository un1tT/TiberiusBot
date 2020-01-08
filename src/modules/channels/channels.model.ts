import * as mongoose from 'mongoose';
import { Document } from "mongoose";
// const uniqueValidator = require('mongoose-unique-validator');

export const ChannelSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
});

// ChannelSchema.plugin(uniqueValidator);

export interface Channel extends Document{
  _id: string;
  name: string;
}

import * as mongoose from 'mongoose';
import { Document } from "mongoose";
export declare const ChannelSchema: mongoose.Schema<any>;
export interface Channel extends Document {
    _id: string;
    name: string;
}
export interface ClientEntity {
    name: string;
    client: any;
}

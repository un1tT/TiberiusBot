import * as mongoose from 'mongoose';

export const ChanelSchema = new mongoose.Schema({
    name: {type: String, required: true}
});

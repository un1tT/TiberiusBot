"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ChannelSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});
//# sourceMappingURL=channels.model.js.map
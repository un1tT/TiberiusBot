"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const TwitchClient_1 = require("../../TwitchClient/TwitchClient");
let ChannelsService = class ChannelsService {
    constructor(channelModel) {
        this.channelModel = channelModel;
        this.clients = [];
        channelModel.deleteMany({}, () => {
            console.log('channels collection is clear');
        });
    }
    createClient(name) {
        const newClient = {
            name,
            client: TwitchClient_1.default.createEntity([name])
        };
        this.clients.push(newClient);
    }
    disconnectClient(name) {
        const clientEntity = this.clients.find(({ name: clientName }) => clientName === name);
        clientEntity.client.disconnect();
    }
    addChannel(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const newChannel = new this.channelModel({ name });
            return yield newChannel.save((err) => {
                console.log(`Unable to add channel ${name} to db, ${err}`);
            }).then(() => name);
        });
    }
    deleteChannel(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channelModel.deleteOne({ name }, () => {
                console.log(`Channel ${name} has been deleted from db`);
            });
        });
    }
    getChannels() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.channelModel.find();
        });
    }
};
ChannelsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Channel')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ChannelsService);
exports.ChannelsService = ChannelsService;
//# sourceMappingURL=channels.service.js.map
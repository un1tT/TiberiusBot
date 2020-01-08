"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const TwitchClient_1 = require("./TwitchClient/TwitchClient");
const KekHandler_1 = require("./Handlers/KekHandler");
const Feed_1 = require("./Handlers/Feed");
const IQ_1 = require("./Handlers/IQ");
const Greetings_1 = require("./Handlers/Greetings");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const iqHandler = new IQ_1.default();
        const feedHandler = new Feed_1.default(iqHandler);
        const kekHandler = new KekHandler_1.default(feedHandler);
        const greetingsHandler = new Greetings_1.default(kekHandler);
        const handlers = [greetingsHandler, kekHandler, feedHandler];
        const bot = new TwitchClient_1.default(handlers);
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        yield app.listen(process.env.PORT || 3000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
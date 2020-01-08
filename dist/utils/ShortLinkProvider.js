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
const axios_1 = require("axios");
const urls_1 = require("../constants/urls");
const auth_1 = require("../constants/auth");
exports.getShortLink = (baseLink) => __awaiter(this, void 0, void 0, function* () {
    const requestConfig = {
        url: urls_1.TOCLICK_API,
        method: 'post',
        headers: {
            'X-AUTH-TOKEN': auth_1.TOCLICK_TOCKEN,
            'Content-Type': 'application/json',
        },
        data: {
            data: {
                type: 'link',
                attributes: {
                    web_url: baseLink,
                },
            },
        },
    };
    try {
        const { data: response } = yield axios_1.default(JSON.stringify(requestConfig));
        return response.data.attributes.full_url;
    }
    catch (error) {
        console.log(error.response);
        return baseLink;
    }
});
//# sourceMappingURL=ShortLinkProvider.js.map
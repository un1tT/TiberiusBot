"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cutString = (str) => {
    if (str.length < 460) {
        return str;
    }
    const readMorePart = str.slice(str.length - 16);
    const shortString = str.slice(0, 440);
    const words = shortString.split(' ');
    words.pop();
    return `${words.join(' ')}... ${readMorePart}`;
};
//# sourceMappingURL=stringCutter.js.map
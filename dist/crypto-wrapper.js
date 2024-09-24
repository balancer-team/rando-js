"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
let cryptoModule;
// @ts-ignore
if (typeof window !== 'undefined' && window.crypto) {
    // @ts-ignore
    cryptoModule = window.crypto;
}
else {
    cryptoModule = require('crypto');
}
exports.default = cryptoModule;

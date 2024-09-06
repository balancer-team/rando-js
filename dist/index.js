"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sid = sid;
const crypto_1 = __importDefault(require("crypto"));
function sid({ length = 22, alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz', prefix = '', } = {}) {
    const a = Array.from({ length }, () => alphabet[crypto_1.default.randomInt(alphabet.length)]);
    return prefix + a.join('');
}

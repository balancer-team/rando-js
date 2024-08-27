"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sid = sid;
const crypto_1 = __importDefault(require("crypto"));
// Defaults to base 32 alphabet, 5 bits per character, 25 characters, 125 bits
// Compare to UUIDv4, which has 122 random bits
// Omits 0, o, i, l, u to improve readability in cases where id may need to be manually read
function sid({ length = 25, alphabet = '123456789abcdefghjkmnpqrstuvwxyz', prefix = '', } = {}) {
    const arr = new Array(length);
    for (let i = 0; i < length; i++) {
        arr[i] = alphabet[crypto_1.default.randomInt(alphabet.length)];
    }
    return prefix + arr.join('');
}

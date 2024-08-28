"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sid = sid;
const crypto_1 = __importDefault(require("crypto"));
// Default base 58 alphabet, 5.85798 bits per character, 22 characters, 128.9 random bits
// Compare to UUIDv4, which has 122 random bits
// Omits 0, O, I, l for readability
function sid({ length = 22, alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz', prefix = '', } = {}) {
    const arr = new Array(length);
    for (let i = 0; i < length; i++) {
        arr[i] = alphabet[crypto_1.default.randomInt(alphabet.length)];
    }
    return prefix + arr.join('');
}

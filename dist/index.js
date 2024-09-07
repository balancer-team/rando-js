"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lex = lex;
exports.rando = rando;
const crypto_1 = __importDefault(require("crypto"));
const constants_1 = require("./constants");
const utils_1 = require("./utils");
function lex({ date = new Date(), alphabet = constants_1.BASE_58, maxDate = null } = {}) {
    // Alphabet must be at least two characters long
    if (alphabet.length < 2)
        throw new Error('The alphabet must be at least two characters long.');
    if (!maxDate)
        maxDate = constants_1.DATE_MAP[alphabet.length];
    // Ensure the alphabet is lexicographically sorted
    alphabet = (0, utils_1.sortAlphabet)(alphabet);
    // Convert the date and maxDate to timestamps
    const timestamp = date.getTime();
    const maxTimestamp = maxDate.getTime();
    let result = '';
    let remaining = timestamp;
    while (remaining > 0 || result.length < Math.ceil(Math.log(maxTimestamp) / Math.log(alphabet.length))) {
        const index = remaining % alphabet.length;
        result = alphabet[index] + result;
        remaining = Math.floor(remaining / alphabet.length);
    }
    return result;
}
function rando({ length = 22, alphabet = constants_1.BASE_58 } = {}) {
    // Length must be greater than 0
    if (length <= 0)
        throw new Error('The length must be greater than 0.');
    // Alphabet must be at least two characters long
    if (alphabet.length < 2)
        throw new Error('The alphabet must be at least two characters long.');
    const a = Array.from({ length }, () => alphabet[crypto_1.default.randomInt(alphabet.length)]);
    return a.join('');
}

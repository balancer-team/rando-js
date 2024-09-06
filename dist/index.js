"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sid = sid;
exports.encodeTimestamp = encodeTimestamp;
exports.decodeTimestamp = decodeTimestamp;
const base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
function sid({ length = 22, alphabet = base58, sortable = false, separator = '' } = {}) {
    return encodeTimestamp(base58);
    // let result = ''
    // const arr = Array.from({ length }, () => alphabet[crypto.randomInt(alphabet.length)])
    // result = arr.join('')
    // if (sortable) result = encodeTimestamp(alphabet) + separator + result
    // return result
}
function encodeTimestamp(alphabet = 'abc') {
    const base = alphabet.length;
    const timestamp = Date.now();
    console.log('Before encoding: ', timestamp); ////////////////////////////////////////
    const maxTimestamp = 8640000000000000; // Maximum value for a Date object
    let result = '';
    let remaining = timestamp;
    while (remaining > 0 || result.length < Math.ceil(Math.log(maxTimestamp) / Math.log(base))) {
        const index = remaining % base;
        result = alphabet[index] + result;
        remaining = Math.floor(remaining / base);
    }
    return result;
}
function decodeTimestamp(encodedTimestamp, alphabet = base58) {
    const base = alphabet.length;
    // Convert the encoded timestamp back to a number
    let decoded = 0;
    for (let i = 0; i < encodedTimestamp.length; i++) {
        decoded = decoded * base + alphabet.indexOf(encodedTimestamp[i]);
    }
    console.log('After decoding: ', decoded); /////////////////////
    return new Date(decoded);
}

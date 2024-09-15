"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortable = exports.pinto = exports.novella = exports.particle = exports.rando = void 0;
const _1 = require("./");
const constants_1 = require("./constants");
// Rando
exports.rando = new _1.Rando();
// Creates a very short id (supports generating over 3,000 unique ids per ms)
exports.particle = new _1.Rando({
    randomLength: 2,
    includeTimestamp: true,
    obfuscateTimestamp: true,
});
// Creates a secure key with 256 bits of entropy
exports.novella = new _1.Rando({
    randomLength: 44,
});
// Pin
exports.pinto = new _1.Rando({
    alphabet: constants_1.NUMBERS,
    randomLength: 6,
});
// Sortable (near UUIDv7 spec but with base 58)
exports.sortable = new _1.Rando({
    randomLength: 12,
    includeTimestamp: true,
    timestampPosition: 'start',
});

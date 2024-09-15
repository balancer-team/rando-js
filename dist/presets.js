"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randoFlake = exports.randoUlid = exports.randoSortable = exports.randoPin = exports.randoKey = exports.randoShort = exports.rando = void 0;
const _1 = require("./");
const constants_1 = require("./constants");
// Rando
exports.rando = new _1.Rando();
// Creates a very short 10-character id (supports generating over 3,000 unique ids per ms)
exports.randoShort = new _1.Rando({
    randomLength: 2,
    includeTimestamp: true,
    obfuscateTimestamp: true,
});
// Creates a secure key with 256 bits of entropy
exports.randoKey = new _1.Rando({
    alphabet: constants_1.BASE_58,
    randomLength: 44,
});
// Pin
exports.randoPin = new _1.Rando({
    alphabet: constants_1.NUMBERS,
    randomLength: 6,
});
// Sortable (near UUIDv7 spec but with base 58)
exports.randoSortable = new _1.Rando({
    randomLength: 12,
    includeTimestamp: true,
    timestampPosition: 'start',
});
// ulid
exports.randoUlid = new _1.Rando({
    alphabet: constants_1.BASE_32_CROCKFORD,
    randomLength: 16,
    includeTimestamp: true,
    timestampPosition: 'start',
    timestampLength: 10,
});
// Snowflake-like, not to spec
exports.randoFlake = new _1.Rando({
    includeTimestamp: true,
    alphabet: constants_1.NUMBERS,
    randomLength: 6,
    timestampPosition: 'start',
});

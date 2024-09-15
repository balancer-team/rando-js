"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snowflake = exports.key = exports.particle = exports.sortable = exports.password = exports.pin = exports.ulid = exports.rando = void 0;
const _1 = require("./");
const constants_1 = require("./constants");
// Rando
exports.rando = new _1.Rando();
// ulid
exports.ulid = new _1.Rando({
    alphabet: constants_1.BASE_32_CROCKFORD,
    randomLength: 16,
    includeTimestamp: true,
    timestampPosition: 'start',
    timestampLength: 10,
});
// Pin
exports.pin = new _1.Rando({
    alphabet: constants_1.NUMBERS,
    randomLength: 6,
});
// Password
exports.password = new _1.Rando({
    alphabet: constants_1.PASSWORD,
    randomLength: 16,
});
// Sortable (near UUIDv7 spec but with base 58)
exports.sortable = new _1.Rando({
    alphabet: constants_1.BASE_58,
    randomLength: 12,
    includeTimestamp: true,
    timestampPosition: 'start',
});
// Particle (short with hidden timestamp, supports generating over 3,000 ids per millisecond)
exports.particle = new _1.Rando({
    randomLength: 2,
    includeTimestamp: true,
    obfuscateTimestamp: true,
});
// Creates a key with 256 bits of entropy
exports.key = new _1.Rando({
    alphabet: constants_1.BASE_58,
    randomLength: 44,
});
// Snowflake-like, not to spec
exports.snowflake = new _1.Rando({
    includeTimestamp: true,
    alphabet: constants_1.NUMBERS,
    randomLength: 6,
    timestampPosition: 'start',
});

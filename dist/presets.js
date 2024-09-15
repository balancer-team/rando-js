"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortable = exports.pinto = exports.locker = exports.particle = exports.rando = void 0;
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
exports.locker = new _1.Rando({
    randomLength: 44,
});
// Pin
exports.pinto = new _1.Rando({
    alphabet: constants_1.NUMBERS,
    randomLength: 6,
});
// Sortable (like UUIDv7 but more compact)
exports.sortable = new _1.Rando({
    randomLength: 14,
    includeTimestamp: true,
    timestampPosition: 'start',
});

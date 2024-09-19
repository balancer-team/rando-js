"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slug = exports.pinto = exports.locker = exports.tracker = exports.particle = exports.rando = void 0;
const _1 = require("./");
const constants_1 = require("./constants");
// Rando (like a compact UUIDv4 with 6 extra entropy bits)
exports.rando = new _1.Rando();
// Particle (like a compact UUIDv7 with 6 extra entropy bits)
exports.particle = new _1.Rando({
    randomLength: 14,
    includeTimestamp: true,
});
// Tracker (hidden timestamp, can't assume unique)
exports.tracker = new _1.Rando({
    randomLength: 2,
    includeTimestamp: true,
    obfuscateTimestamp: true,
});
// Locker (creates a secure key with 256 bits of entropy)
exports.locker = new _1.Rando({
    randomLength: 44,
});
// Pin (for verification codes, etc)
exports.pinto = new _1.Rando({
    alphabet: constants_1.NUMBERS,
    randomLength: 6,
});
// Slug (very short, can't assume unique)
exports.slug = new _1.Rando({
    alphabet: constants_1.CLEAN,
    randomLength: 8,
});

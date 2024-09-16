"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.particle = exports.pinto = exports.locker = exports.rando = void 0;
const _1 = require("./");
const constants_1 = require("./constants");
// Rando
exports.rando = new _1.Rando();
// Creates a secure key with 256 bits of entropy
exports.locker = new _1.Rando({
    randomLength: 44,
});
// Pin
exports.pinto = new _1.Rando({
    alphabet: constants_1.NUMBERS,
    randomLength: 6,
});
// Particle (like UUIDv7 but shorter and with 6 extra entropy bits)
exports.particle = new _1.Rando({
    randomLength: 14,
    includeTimestamp: true,
});

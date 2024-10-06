"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinto = exports.locker = exports.particle = exports.rando = void 0;
const _1 = require("./");
const constants_1 = require("./constants");
// Rando (like a compact UUIDv4)
exports.rando = new _1.Rando();
// Particle (like a compact UUIDv7)
exports.particle = new _1.Rando({
    sortable: true,
});
// Locker (secure key with over 256 bits of entropy)
exports.locker = new _1.Rando({
    length: 44,
});
// Pin (for verification codes, etc)
exports.pinto = new _1.Rando({
    alphabet: constants_1.NUMBERS,
    length: 6,
});

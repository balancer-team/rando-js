"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slug = exports.pinto = exports.sesame = exports.locker = exports.particle = exports.rando = void 0;
const _1 = require("./");
const constants_1 = require("./constants");
// Rando (like a compact UUIDv4)
exports.rando = new _1.Rando();
// Particle (like a compact ObjectId)
exports.particle = new _1.Rando({
    length: 21,
    sortable: true,
});
// Locker (secure key with over 256 bits of entropy)
exports.locker = new _1.Rando({
    length: 48,
});
// Sesame (secure password with over 128 bits of entropy)
exports.sesame = new _1.Rando({
    alphabet: constants_1.PASSWORD,
    length: 14,
});
// Pin (for verification codes, etc)
exports.pinto = new _1.Rando({
    alphabet: constants_1.NUMBERS,
    length: 6,
});
// Slug (short, sortable)
exports.slug = new _1.Rando({
    length: 9,
    sortable: true,
});

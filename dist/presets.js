"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinto = exports.sesame = exports.locker = exports.sorto = exports.rando = void 0;
const _1 = require("./");
const constants_1 = require("./constants");
// Rando (like a compact UUIDv4)
exports.rando = new _1.Rando();
// Sorto (like a compact UUIDv7)
exports.sorto = new _1.Rando({
    sortable: true,
});
// Locker (secure key with over 256 bits of entropy)
exports.locker = new _1.Rando({
    length: 44,
});
// Sesame (secure password with over 128 bits of entropy)
exports.sesame = new _1.Rando({
    alphabet: constants_1.PASSWORD,
    length: 20,
});
// Pinto (for verification codes, etc)
exports.pinto = new _1.Rando({
    alphabet: constants_1.NUMBERS,
    length: 6,
});

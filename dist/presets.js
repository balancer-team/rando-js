"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ulid = ulid;
exports.flake = flake;
exports.fav = fav;
const index_1 = require("./index");
const constants_1 = require("./constants");
function ulid() {
    const lexOptions = { maxYear: 10889, alphabet: constants_1.BASE_32_CROCKFORD };
    const randoOptions = { length: 16, alphabet: constants_1.BASE_32_CROCKFORD };
    return (0, index_1.lex)(lexOptions) + (0, index_1.rando)(randoOptions); // ulid spec: 48 bit timestamp, 80 bit random string
}
function flake() {
    // Generate a Snowflake-like ID
    // Not exactly snowflake spec
    const lexOptions = { maxYear: 2287, alphabet: constants_1.NUMBERS };
    const randoOptions = { length: 5, alphabet: constants_1.NUMBERS };
    return (0, index_1.lex)(lexOptions) + (0, index_1.rando)(randoOptions);
}
function fav() {
    const lexOptions = { date: new Date('6000-01-01') };
    const randoOptions = { length: 8 };
    return (0, index_1.lex)(lexOptions) + (0, index_1.rando)(randoOptions);
}

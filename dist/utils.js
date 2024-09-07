"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortAlphabet = sortAlphabet;
exports.decodeLex = decodeLex;
const constants_1 = require("./constants");
// Ensures the alphabet is lexicographically sorted
function sortAlphabet(alphabet) {
    return alphabet.split('').sort().join('');
}
function decodeLex({ encoded, alphabet = constants_1.BASE_58 }) {
    // Alphabet must not be empty
    if (!alphabet)
        throw new Error('The alphabet must not be empty.');
    // Validate the year. Must be later than the current year.
    // if (maxYear <= 1970) throw new Error('The year must be later than 1970.')
    // Sort the alphabet
    alphabet = sortAlphabet(alphabet);
    // Find the length of the alphabet
    const base = alphabet.length;
    // Convert the encoded timestamp back to a number
    let decoded = 0;
    for (let i = 0; i < encoded.length; i++) {
        decoded = decoded * base + alphabet.indexOf(encoded[i]);
    }
    return new Date(decoded);
}

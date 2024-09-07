"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPracticalRanges = getPracticalRanges;
exports.practicalMaxDate = practicalMaxDate;
exports.generatePracticalMaxDates = generatePracticalMaxDates;
const constants_1 = require("./constants");
const index_1 = require("./index");
const utils_1 = require("./utils");
// TODO organize and rename
// Lists practical ranges, given an alphabet
function getPracticalRanges(alphabet) {
    alphabet = (0, utils_1.sortAlphabet)(alphabet);
    const now = new Date();
    // Get the first and last character in the alphabet
    const firstCharacter = alphabet[0];
    const lastCharacter = alphabet[alphabet.length - 1];
    // Get the maximum time in JavaScript
    let date = new Date(8640000000000000);
    console.log('------------------------------------------');
    while (date > now) {
        let maxString = (0, index_1.lex)({ date, alphabet, maxDate: date });
        let maxDate = date.toISOString().split('T')[0];
        let length = maxString.length;
        let minString = firstCharacter.repeat(length);
        console.log(`String Range:   ${minString} - ${maxString}`);
        console.log(`Date Range:     1970-01-01 - ${maxDate}`);
        console.log(`Example:        ${(0, index_1.lex)({ alphabet, maxDate: date })}`);
        console.log('------------------------------------------');
        date = (0, utils_1.decodeLex)({ encoded: lastCharacter.repeat(length - 1), alphabet });
    }
}
function practicalMaxDate(alphabet = constants_1.BASE_58) {
    alphabet = (0, utils_1.sortAlphabet)(alphabet);
    // Generate a string for the year 3000
    const practicalFutureString = (0, index_1.lex)({ date: new Date('3000-01-01'), alphabet });
    const length = practicalFutureString.length;
    const lastCharacter = alphabet[alphabet.length - 1];
    // Decode the string to get the date
    return (0, utils_1.decodeLex)({ encoded: lastCharacter.repeat(length), alphabet });
}
function generatePracticalMaxDates() {
    for (let i = 2; i <= 64; i++) {
        let date = practicalMaxDate(constants_1.BASE_64_URL.slice(0, i));
        if (date > new Date('9999-12-31'))
            date = new Date('9999-12-31');
        const dateString = date.toISOString().split('T')[0];
        console.log(`${i}: new Date('${dateString}'),`);
    }
    // Create a loop for variable i from 1 to 64
    // For each i, generate the practical max date
    // Print the date as a string
}

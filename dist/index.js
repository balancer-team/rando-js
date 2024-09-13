"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rando = void 0;
const crypto_1 = __importDefault(require("crypto"));
const constants_1 = require("./constants");
class Rando {
    // Properties
    alphabet;
    length;
    base;
    sortable;
    sortableSeparator;
    sortableLength;
    sortableAlphabet;
    sortableBase;
    maxDate;
    bitsOfEntropy;
    // Constructor
    constructor({ alphabet = constants_1.BASE_58, length = 22, sortable = undefined, sortableSeparator = '', sortableLength = undefined, sortableAlphabet = undefined, } = {}) {
        // Validation logic
        if (typeof alphabet !== 'string' || alphabet.length < 2) {
            throw new Error('alphabet must be at least two characters.');
        }
        if (typeof length !== 'number' || length <= 0) {
            throw new Error('randomLength must be greater than zero.');
        }
        if (sortable && sortable !== 'prefix' && sortable !== 'suffix') {
            throw new Error('sortable must be either "prefix" or "suffix".');
        }
        if (typeof sortableSeparator !== 'string') {
            throw new Error('sortableSeparator must be a string.');
        }
        if (sortableAlphabet && (typeof sortableAlphabet !== 'string' || sortableAlphabet.length < 2)) {
            throw new Error('sortableAlphabet: must be a non-empty string or null.');
        }
        if (sortableLength && (typeof sortableLength !== 'number' || sortableLength < 7)) {
            throw new Error('sortableLength must be at least 7.');
        }
        // Ensure sortableLength is at least the default length for the given base
        if (sortableLength && sortableLength < constants_1.SORTABLE_DEFAULTS[sortableLength].length) {
            throw new Error('sortableLength must be at least the default length for the given base.');
        }
        // Ensure all alphabets have unique characters
        const uniqueAlphabet = new Set(alphabet);
        if (uniqueAlphabet.size !== alphabet.length) {
            throw new Error('alphabet must have unique characters.');
        }
        if (sortableAlphabet) {
            const uniqueSortableAlphabet = new Set(sortableAlphabet);
            if (uniqueSortableAlphabet.size !== sortableAlphabet.length) {
                throw new Error('sortableAlphabet must have unique characters.');
            }
        }
        // Assign properties
        this.alphabet = alphabet;
        this.length = length;
        this.base = this.alphabet.length;
        this.sortable = sortable;
        this.sortableSeparator = sortableSeparator;
        if (!sortableAlphabet)
            this.sortableAlphabet = this.sortAlphabet(alphabet);
        else
            this.sortableAlphabet = this.sortAlphabet(sortableAlphabet);
        this.sortableBase = this.sortableAlphabet.length;
        this.sortableLength = sortableLength || constants_1.SORTABLE_DEFAULTS[this.sortableBase].length;
        this.maxDate = new Date(Math.pow(this.sortableBase, this.sortableLength));
        this.bitsOfEntropy = Math.floor(Math.log2(this.base) * this.length * 100) / 100;
    }
    // Methods
    generate({ date = new Date() } = {}) {
        if (this.sortable === 'prefix') {
            return this.generateSortableSegment({ date }) + this.sortableSeparator + this.generateRandomSegment();
        }
        else if (this.sortable === 'suffix') {
            return this.generateRandomSegment() + this.sortableSeparator + this.generateSortableSegment({ date });
        }
        else {
            return this.generateRandomSegment();
        }
    }
    generateRandomSegment() {
        const arr = Array.from({ length: this.length }, () => this.alphabet[crypto_1.default.randomInt(this.base)]);
        return arr.join('');
    }
    generateSortableSegment({ date = new Date() } = {}) {
        const timestamp = date.getTime();
        let result = '';
        let remaining = timestamp;
        while (remaining > 0 || result.length < this.sortableLength) {
            const index = remaining % this.sortableBase;
            result = this.sortableAlphabet[index] + result;
            remaining = Math.floor(remaining / this.sortableBase);
        }
        return result;
    }
    sortAlphabet(alphabet) {
        return alphabet.split('').sort().join('');
    }
    getDate(id) {
        // Use the sortableLength to get the sortable segment of the ID
        let encoded = '';
        if (this.sortable === 'prefix') {
            encoded = id.slice(0, this.sortableLength);
        }
        else if (this.sortable === 'suffix') {
            encoded = id.slice(-this.sortableLength);
        }
        else {
            throw new Error('getDate is only available for sortable IDs.');
        }
        let decoded = 0;
        for (let i = 0; i < encoded.length; i++) {
            decoded = decoded * this.sortableBase + this.sortableAlphabet.indexOf(encoded[i]);
        }
        return new Date(decoded);
    }
    getInfo() {
        return {
            alphabet: this.alphabet,
            length: this.length,
            base: this.base,
            sortable: this.sortable,
            sortableSeparator: this.sortableSeparator,
            sortableLength: this.sortableLength,
            sortableAlphabet: this.sortableAlphabet,
            sortableBase: this.sortableBase,
            maxDate: this.maxDate,
            bitsOfEntropy: this.bitsOfEntropy,
        };
    }
}
exports.Rando = Rando;

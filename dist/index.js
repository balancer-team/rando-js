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
    randomLength;
    randomAlphabet;
    randomBase;
    isSortable;
    sortableSeparator;
    sortableLength;
    sortableAlphabet;
    sortableBase;
    sortableDate;
    // readonly sortableMaxDate: Date
    // Constructor
    constructor({ alphabet = constants_1.BASE_58, randomLength = 22, randomAlphabet = undefined, isSortable = false, sortableSeparator = '', sortableLength = undefined, sortableAlphabet = undefined, sortableDate = undefined, } = {}) {
        // Validation logic
        if (typeof alphabet !== 'string' || alphabet.length < 2) {
            throw new Error('alphabet must be at least two characters.');
        }
        if (typeof randomLength !== 'number' || randomLength <= 0) {
            throw new Error('randomLength must be greater than zero.');
        }
        if (randomAlphabet && (typeof randomAlphabet !== 'string' || randomAlphabet.length < 2)) {
            throw new Error('randomAlphabet must at least two characters.');
        }
        if (typeof isSortable !== 'boolean') {
            throw new Error('isSortable must be a boolean.');
        }
        if (typeof sortableSeparator !== 'string') {
            throw new Error('sortableSeparator must be a string.');
        }
        if (sortableAlphabet && (typeof sortableAlphabet !== 'string' || sortableAlphabet.length < 2)) {
            throw new Error('sortableAlphabet: must be a non-empty string or null.');
        }
        if (sortableLength && (typeof sortableLength !== 'number' || sortableLength <= 0)) {
            throw new Error('sortableLength must be greater than zero.');
        }
        if (sortableDate && !(sortableDate instanceof Date)) {
            throw new Error('sortableDate must be a Date object.');
        }
        // Assign properties
        this.alphabet = alphabet;
        this.randomLength = randomLength;
        this.randomAlphabet = randomAlphabet || alphabet;
        this.randomBase = this.randomAlphabet.length;
        this.isSortable = isSortable;
        this.sortableSeparator = sortableSeparator;
        if (!sortableAlphabet)
            this.sortableAlphabet = this.sortAlphabet(alphabet);
        else
            this.sortableAlphabet = this.sortAlphabet(sortableAlphabet);
        this.sortableBase = this.sortableAlphabet.length;
        this.sortableLength = sortableLength || constants_1.SORTABLE_DEFAULTS[this.sortableBase].length;
        this.sortableDate = sortableDate || new Date();
    }
    // Methods
    generate() {
        return this.generateSortableString() + this.sortableSeparator + this.generateRandomString();
    }
    generateRandomString() {
        const randomArray = Array.from({ length: this.randomLength }, () => {
            this.randomAlphabet[crypto_1.default.randomInt(this.randomAlphabet.length)];
        });
        return randomArray.join('');
    }
    generateSortableString() {
        const timestamp = this.sortableDate.getTime();
        const maxTimestamp = Math.pow(this.sortableBase, this.sortableLength);
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
    decodeSortableString(encoded) {
        let decoded = 0;
        for (let i = 0; i < encoded.length; i++) {
            decoded = decoded * this.sortableBase + this.sortableAlphabet.indexOf(encoded[i]);
        }
        return new Date(decoded);
    }
}
exports.Rando = Rando;

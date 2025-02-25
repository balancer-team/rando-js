"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rando = void 0;
const rng_1 = require("./rng");
const constants_1 = require("./constants");
class Rando {
    // Properties
    alphabet;
    length;
    randomLength;
    base;
    randomBits;
    randomLimit;
    sortable;
    supportDate;
    sortableLength;
    sortableLimit;
    // Constructor
    constructor({ alphabet = constants_1.BASE_50, length = 22, sortable = false, supportDate = new Date('4000'), } = {}) {
        // Validation logic
        if (typeof alphabet !== 'string' || alphabet.length < 2) {
            throw new Error('alphabet must be at least two characters.');
        }
        const uniqueAlphabet = new Set(alphabet);
        if (uniqueAlphabet.size !== alphabet.length) {
            throw new Error('alphabet must have unique characters.');
        }
        if (typeof length !== 'number' || length <= 0) {
            throw new Error('length must be greater than zero.');
        }
        if (typeof sortable !== 'boolean') {
            throw new Error('sortable must be a boolean.');
        }
        if (!(supportDate instanceof Date)) {
            throw new Error('supportDate must be a Date object.');
        }
        if (supportDate.getTime() < Date.now()) {
            throw new Error('supportDate must be in the future.');
        }
        // Assign the options
        this.alphabet = this.sortAlphabet(alphabet);
        this.length = length;
        this.base = this.alphabet.length;
        this.sortable = sortable;
        this.supportDate = supportDate;
        // Length of the sortable segment needed to support the target date at maximum resolution
        this.sortableLength = this.sortable ? Math.floor(Math.log(this.supportDate.getTime()) / Math.log(this.base)) + 1 : 0;
        if (this.sortableLength > this.length) {
            throw new Error('length insufficient for sortable segment.');
        }
        // Set the remaining properties
        this.sortableLimit = new Date(Math.pow(this.base, this.sortableLength));
        this.randomLength = this.length - this.sortableLength;
        this.randomBits = Math.log2(Math.pow(this.base, this.randomLength));
        this.randomLimit = Math.round(Math.pow(2, this.randomBits));
    }
    // Methods
    generate({ date = new Date() } = {}) {
        const randomSegment = this.generateRandomSegment();
        if (!this.sortable)
            return randomSegment;
        const sortableSegment = this.generateSortableSegment({ date });
        return sortableSegment + randomSegment;
    }
    generateRandomSegment() {
        return Array.from({ length: this.randomLength }, () => this.alphabet[(0, rng_1.rng)(this.base)]).join('');
    }
    generateSortableSegment({ date = new Date() } = {}) {
        if (!this.sortable)
            throw new Error('generateSortableSegment requires sortable.');
        let sortableSegment = '';
        let remaining = date.getTime();
        while (remaining > 0 || sortableSegment.length < this.sortableLength) {
            const i = remaining % this.base;
            sortableSegment = this.alphabet[i] + sortableSegment;
            remaining = Math.floor(remaining / this.base);
        }
        return sortableSegment;
    }
    getRandomSegment(id) {
        return id.slice(this.sortableLength);
    }
    getSortableSegment(id) {
        if (!this.sortable)
            throw new Error('getSortableSegment requires including a timestamp.');
        return id.slice(0, this.sortableLength);
    }
    sortAlphabet(alphabet) {
        return alphabet.split('').sort().join('');
    }
    getDate(id) {
        if (!this.sortable)
            return null;
        if (id.length < this.sortableLength)
            return null;
        let sortableSegment = this.getSortableSegment(id);
        let decoded = 0;
        for (let i = 0; i < sortableSegment.length; i++) {
            const alphabetIndex = this.alphabet.indexOf(sortableSegment[i]);
            if (alphabetIndex === -1)
                return null;
            decoded = decoded * this.base + alphabetIndex;
        }
        return new Date(decoded);
    }
}
exports.Rando = Rando;

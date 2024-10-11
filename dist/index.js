"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rando = void 0;
const crypto_1 = require("crypto");
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
    sortableTrim;
    sortableResolution;
    sortableFullLength; // length of the sortable segment needed to support maximum resolution
    signatureFullLength; // length of the signature segment needed to support maximum signature calc
    secret;
    // Constructor
    constructor({ alphabet = constants_1.BASE_58, length = 22, sortable = false, supportDate = new Date('3000-01-01'), secret = undefined, } = {}) {
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
        if (secret && typeof secret !== 'string') {
            throw new Error('secret must be a string or undefined.');
        }
        // Assign the options
        this.alphabet = this.sortAlphabet(alphabet);
        this.length = length;
        this.base = this.alphabet.length;
        this.sortable = sortable;
        this.supportDate = supportDate;
        this.secret = secret;
        // Length of the sortable segment needed to support the target date at maximum resolution
        this.sortableFullLength = Math.floor(Math.log(this.supportDate.getTime()) / Math.log(this.base)) + 1;
        // Signature length needed to support the maximum hash value. Numerator is pre-calculated value of 2^256
        this.signatureFullLength = Math.floor(Math.log(1.157920892373162e77) / Math.log(this.base)) + 1;
        // Set the remaining properties
        this.sortableTrim = Math.max(0, this.sortableFullLength - this.length);
        this.sortableLength = this.sortable ? Math.min(this.sortableFullLength, this.length) : 0;
        this.sortableLimit = new Date(Math.pow(this.base, this.sortableFullLength));
        this.randomLength = this.length - this.sortableLength;
        this.randomBits = Math.log2(Math.pow(this.base, this.randomLength));
        this.randomLimit = Math.round(Math.pow(2, this.randomBits));
        const lostResolution = Math.pow(this.base, this.sortableTrim);
        this.sortableResolution = constants_1.RESOLUTIONS.find((r) => r.max >= lostResolution)?.description ?? 'Unknown';
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
        const arr = Array.from({ length: this.randomLength }, () => this.alphabet[(0, crypto_1.randomInt)(this.base)]);
        const s = arr.join('');
        return s;
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
        if (this.sortableTrim > 0) {
            sortableSegment = sortableSegment.slice(0, -this.sortableTrim);
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
        if (this.sortableTrim > 0) {
            sortableSegment = sortableSegment.padEnd(this.sortableLength + this.sortableTrim, this.alphabet[0]);
        }
        let decoded = 0;
        for (let i = 0; i < sortableSegment.length; i++) {
            const alphabetIndex = this.alphabet.indexOf(sortableSegment[i]);
            if (alphabetIndex === -1)
                return null;
            decoded = decoded * this.base + alphabetIndex;
        }
        return new Date(decoded);
    }
    sign(id) {
        if (!this.secret)
            throw new Error('sign requires a secret.');
        const hash = (0, crypto_1.createHmac)('sha256', this.secret).update(id).digest('hex');
        // Convert the hash from base 16 to the base of the alphabet
        let signature = '';
        let remaining = BigInt('0x' + hash);
        while (remaining > 0n) {
            const i = Number(remaining % BigInt(this.base));
            signature = this.alphabet[i] + signature;
            remaining = remaining / BigInt(this.base);
        }
        return id + signature.padStart(this.signatureFullLength, this.alphabet[0]);
    }
    verify(signed) {
        if (!this.secret)
            throw new Error('verify requires a secret.');
        const id = signed.slice(0, this.length);
        if (this.sign(id) === signed)
            return id;
        return null;
    }
}
exports.Rando = Rando;

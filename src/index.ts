import crypto from 'crypto'
import { BASE_58, SORTABLE_DEFAULTS } from './constants'

type RandoOptions = {
  alphabet?: string
  randomLength?: number
  randomAlphabet?: string
  isSortable?: boolean
  sortableSeparator?: string
  sortableAlphabet?: string
  sortableLength?: number
  sortableDate?: Date
}

export class Rando {
  // Properties
  readonly alphabet: string
  readonly randomLength: number
  readonly randomAlphabet: string
  readonly randomBase: number
  readonly isSortable: boolean
  readonly sortableSeparator: string
  readonly sortableLength: number
  readonly sortableAlphabet: string
  readonly sortableBase: number
  readonly sortableDate: Date

  // Constructor
  constructor({
    alphabet = BASE_58,
    randomLength = 22,
    randomAlphabet = undefined,
    isSortable = false,
    sortableSeparator = '',
    sortableLength = undefined,
    sortableAlphabet = undefined,
    sortableDate = undefined,
  }: RandoOptions = {}) {
    // Validation logic
    if (typeof alphabet !== 'string' || alphabet.length < 2) {
      throw new Error('alphabet must be at least two characters.')
    }
    if (typeof randomLength !== 'number' || randomLength <= 0) {
      throw new Error('randomLength must be greater than zero.')
    }
    if (randomAlphabet && (typeof randomAlphabet !== 'string' || randomAlphabet.length < 2)) {
      throw new Error('randomAlphabet must at least two characters.')
    }
    if (typeof isSortable !== 'boolean') {
      throw new Error('isSortable must be a boolean.')
    }
    if (typeof sortableSeparator !== 'string') {
      throw new Error('sortableSeparator must be a string.')
    }
    if (sortableAlphabet && (typeof sortableAlphabet !== 'string' || sortableAlphabet.length < 2)) {
      throw new Error('sortableAlphabet: must be a non-empty string or null.')
    }
    if (sortableLength && (typeof sortableLength !== 'number' || sortableLength <= 0)) {
      throw new Error('sortableLength must be greater than zero.')
    }

    // If sortableLength is less than the default, throw an error
    if (sortableLength && sortableLength < SORTABLE_DEFAULTS[sortableLength].length) {
      throw new Error('sortableLength must be at least the default length for the given base.')
    }

    if (sortableDate && !(sortableDate instanceof Date)) {
      throw new Error('sortableDate must be a Date object.')
    }

    // Ensure all alphabets have unique characters
    const uniqueAlphabet = new Set(alphabet)
    if (uniqueAlphabet.size !== alphabet.length) {
      throw new Error('alphabet must have unique characters.')
    }

    if (randomAlphabet) {
      const uniqueRandomAlphabet = new Set(randomAlphabet)
      if (uniqueRandomAlphabet.size !== randomAlphabet.length) {
        throw new Error('randomAlphabet must have unique characters.')
      }
    }

    if (sortableAlphabet) {
      const uniqueSortableAlphabet = new Set(sortableAlphabet)
      if (uniqueSortableAlphabet.size !== sortableAlphabet.length) {
        throw new Error('sortableAlphabet must have unique characters.')
      }
    }

    // Assign properties
    this.alphabet = alphabet
    this.randomLength = randomLength
    this.randomAlphabet = randomAlphabet || alphabet
    this.randomBase = this.randomAlphabet.length
    this.isSortable = isSortable
    this.sortableSeparator = sortableSeparator
    if (!sortableAlphabet) this.sortableAlphabet = this.sortAlphabet(alphabet)
    else this.sortableAlphabet = this.sortAlphabet(sortableAlphabet)
    this.sortableBase = this.sortableAlphabet.length
    this.sortableLength = sortableLength || SORTABLE_DEFAULTS[this.sortableBase].length
    this.sortableDate = sortableDate || new Date()
  }

  // Methods
  generate(): string {
    if (!this.isSortable) {
      return this.generateRandomSegment()
    } else {
      return this.generateSortableSegment() + this.sortableSeparator + this.generateRandomSegment()
    }
  }

  generateRandomSegment() {
    const randomArray = Array.from({ length: this.randomLength }, () => {
      return this.randomAlphabet[crypto.randomInt(this.randomBase)]
    })
    return randomArray.join('')
  }

  generateSortableSegment(): string {
    const timestamp = this.sortableDate.getTime()
    // const maxTimestamp = Math.pow(this.sortableBase, this.sortableLength)

    let result = ''
    let remaining = timestamp

    while (remaining > 0 || result.length < this.sortableLength) {
      const index = remaining % this.sortableBase
      result = this.sortableAlphabet[index] + result
      remaining = Math.floor(remaining / this.sortableBase)
    }

    return result
  }

  sortAlphabet(alphabet: string): string {
    return alphabet.split('').sort().join('')
  }

  decodeSortable(id: string): Date {
    // Use the sortableLength to get the sortable segment of the ID
    const encoded = id.slice(0, this.sortableLength)

    let decoded = 0
    for (let i = 0; i < encoded.length; i++) {
      decoded = decoded * this.sortableBase + this.sortableAlphabet.indexOf(encoded[i])
    }
    return new Date(decoded)
  }
}

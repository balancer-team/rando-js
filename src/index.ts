import { rng } from './rng'
import { BASE_44 } from './constants'

type RandoOptions = {
  alphabet?: string
  length?: number
  sortable?: boolean
  supportDate?: Date
}

type GenerateOptions = {
  date?: Date
}

export class Rando {
  // Properties
  readonly alphabet: string
  readonly length: number
  readonly randomLength: number
  readonly base: number
  readonly randomBits: number
  readonly randomLimit: number
  readonly sortable: boolean
  readonly supportDate: Date
  readonly sortableLength: number
  readonly sortableLimit: Date

  // Constructor
  constructor({
    alphabet = BASE_44,
    length = 24,
    sortable = false,
    supportDate = new Date('3000-01-01'),
  }: RandoOptions = {}) {
    // Validation logic
    if (typeof alphabet !== 'string' || alphabet.length < 2) {
      throw new Error('alphabet must be at least two characters.')
    }

    const uniqueAlphabet = new Set(alphabet)
    if (uniqueAlphabet.size !== alphabet.length) {
      throw new Error('alphabet must have unique characters.')
    }

    if (typeof length !== 'number' || length <= 0) {
      throw new Error('length must be greater than zero.')
    }

    if (typeof sortable !== 'boolean') {
      throw new Error('sortable must be a boolean.')
    }

    if (!(supportDate instanceof Date)) {
      throw new Error('supportDate must be a Date object.')
    }

    if (supportDate.getTime() < Date.now()) {
      throw new Error('supportDate must be in the future.')
    }

    // Assign the options
    this.alphabet = this.sortAlphabet(alphabet)
    this.length = length
    this.base = this.alphabet.length
    this.sortable = sortable
    this.supportDate = supportDate

    // Length of the sortable segment needed to support the target date at maximum resolution
    this.sortableLength = this.sortable ? Math.floor(Math.log(this.supportDate.getTime()) / Math.log(this.base)) + 1 : 0

    if (this.sortableLength > this.length) {
      throw new Error('length insufficient for sortable segment.')
    }

    // Set the remaining properties
    this.sortableLimit = new Date(Math.pow(this.base, this.sortableLength))
    this.randomLength = this.length - this.sortableLength
    this.randomBits = Math.log2(Math.pow(this.base, this.randomLength))
    this.randomLimit = Math.round(Math.pow(2, this.randomBits))
  }

  // Methods
  generate({ date = new Date() }: GenerateOptions = {}): string {
    const randomSegment = this.generateRandomSegment()
    if (!this.sortable) return randomSegment
    const sortableSegment = this.generateSortableSegment({ date })
    return sortableSegment + randomSegment
  }

  generateRandomSegment(): string {
    const arr = Array.from({ length: this.randomLength }, () => this.alphabet[rng(this.base)])
    const s = arr.join('')
    return s
  }

  generateSortableSegment({ date = new Date() }: GenerateOptions = {}): string {
    if (!this.sortable) throw new Error('generateSortableSegment requires sortable.')

    let sortableSegment = ''
    let remaining = date.getTime()

    while (remaining > 0 || sortableSegment.length < this.sortableLength) {
      const i = remaining % this.base
      sortableSegment = this.alphabet[i] + sortableSegment
      remaining = Math.floor(remaining / this.base)
    }

    return sortableSegment
  }

  getRandomSegment(id: string): string {
    return id.slice(this.sortableLength)
  }

  getSortableSegment(id: string): string {
    if (!this.sortable) throw new Error('getSortableSegment requires including a timestamp.')
    return id.slice(0, this.sortableLength)
  }

  sortAlphabet(alphabet: string): string {
    return alphabet.split('').sort().join('')
  }

  getDate(id: string): Date | null {
    if (!this.sortable) return null
    if (id.length < this.sortableLength) return null

    let sortableSegment = this.getSortableSegment(id)

    let decoded = 0
    for (let i = 0; i < sortableSegment.length; i++) {
      const alphabetIndex = this.alphabet.indexOf(sortableSegment[i])
      if (alphabetIndex === -1) return null
      decoded = decoded * this.base + alphabetIndex
    }
    return new Date(decoded)
  }
}

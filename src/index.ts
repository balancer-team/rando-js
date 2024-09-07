import crypto from 'crypto'

type RandoOptions = {
  length?: number
  alphabet?: string
}

type LexOptions = {
  date?: Date
  alphabet?: string
  maxYear?: number
}

type DecodeLexOptions = {
  encoded: string
  alphabet?: string
  // maxYear?: number
}

export const BASE_58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
export const BASE_64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
export const BASE_64_URL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
export const CROCKFORD_32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
export const HEX = '0123456789abcdef'
export const ACE = 'weruoaszxcvnm'
export const DIGITS = '0123456789'

// Ensure that the alphabet is lexically sorted
export function sortAlphabet(alphabet: string): string {
  return alphabet.split('').sort().join('')
}

export function rando({ length = 22, alphabet = BASE_58 }: RandoOptions = {}): string {
  // Length must be greater than 0
  if (length <= 0) throw new Error('The length must be greater than 0.')

  // Alphabet must not be empty
  if (!alphabet) throw new Error('The alphabet must not be empty.')

  const a = Array.from({ length }, () => alphabet[crypto.randomInt(alphabet.length)])
  return a.join('')
}

// TODO: Need to figure out how to dial in the maxYear (can this be done down to the millisecond?)

export function lex({ date = new Date(), alphabet = BASE_58, maxYear = 6000 }: LexOptions = {}): string {
  // Alphabet must not be empty
  if (!alphabet) throw new Error('The alphabet must not be empty.')

  // console.log(date.getFullYear())

  // Validate the year. Must be later than the current year.
  if (maxYear < date.getFullYear()) throw new Error('The year must be later than the current year.')

  // Sort the alphabet
  alphabet = sortAlphabet(alphabet)

  // Convert the date to a timestamp
  const timestamp = date.getTime()

  // Define the maximum timestamp, which determines how many leading characters are used
  const maxMs = 1000 * 60 * 60 * 24 * 365 * (maxYear - 1970)

  let result = ''
  let remaining = timestamp

  while (remaining > 0 || result.length < Math.ceil(Math.log(maxMs) / Math.log(alphabet.length))) {
    const index = remaining % alphabet.length
    result = alphabet[index] + result
    remaining = Math.floor(remaining / alphabet.length)
  }

  return result
}

export function decodeLex({ encoded, alphabet = BASE_58 }: DecodeLexOptions): Date {
  // Alphabet must not be empty
  if (!alphabet) throw new Error('The alphabet must not be empty.')

  // Validate the year. Must be later than the current year.
  // if (maxYear <= 1970) throw new Error('The year must be later than 1970.')

  // Sort the alphabet
  alphabet = sortAlphabet(alphabet)

  // Find the length of the alphabet
  const base = alphabet.length

  // Convert the encoded timestamp back to a number
  let decoded = 0
  for (let i = 0; i < encoded.length; i++) {
    decoded = decoded * base + alphabet.indexOf(encoded[i])
  }

  return new Date(decoded)
}

// Tells you how long the lex string will be, given the options
export function lexLength({ date = new Date(), alphabet = BASE_58, maxYear = 6000 }: LexOptions): number {
  const generated = lex({ date, alphabet, maxYear })
  return generated.length
}

export function lexPracticalMaximums(alphabet: string = BASE_58): void {
  alphabet = sortAlphabet(alphabet)

  // get the last character in the alphabet
  const s = alphabet[alphabet.length - 1]

  // Repeat the string s six times
  console.log('Length of 6: ' + decodeLex({ encoded: s.repeat(6), alphabet }).toISOString())
  console.log('Length of 7: ' + decodeLex({ encoded: s.repeat(7), alphabet }).toISOString())
  console.log('Length of 8: ' + decodeLex({ encoded: s.repeat(8), alphabet }).toISOString())
  console.log('Length of 9: ' + decodeLex({ encoded: s.repeat(9), alphabet }).toISOString())

  // Need to figure out how to not go past the maxium javascript date

  // console.log('Length of 10: ' + decodeLex({ encoded: s.repeat(10), alphabet }).toISOString())
  // console.log('Length of 11: ' + decodeLex({ encoded: s.repeat(11), alphabet }).toISOString())
  // console.log('Length of 12: ' + decodeLex({ encoded: s.repeat(12), alphabet }).toISOString())
}

export function ulid() {
  const lexOptions = { maxYear: 10889, alphabet: CROCKFORD_32 }
  const randoOptions = { length: 16, alphabet: CROCKFORD_32 }
  return lex(lexOptions) + rando(randoOptions) // ulid spec: 48 bit timestamp, 80 bit random string
}

export function flake() {
  // Generate a Snowflake-like ID
  // Not exactly snowflake spec
  const lexOptions = { maxYear: 2287, alphabet: DIGITS }
  const randoOptions = { length: 5, alphabet: DIGITS }
  return lex(lexOptions) + rando(randoOptions)
}

export function fav() {
  const lexOptions = { date: new Date('6000-01-01') }
  const randoOptions = { length: 8 }
  return lex(lexOptions) + rando(randoOptions)
}

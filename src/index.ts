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
  maxYear?: number
}

export const BASE_58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
export const BASE_64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
export const BASE_64_URL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
export const CROCKFORD_32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
export const HEX = '0123456789abcdef'
export const ACE = 'weruoaszxcvnm'

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

export function lex({ date = new Date(), alphabet = BASE_58, maxYear = 6000 }: LexOptions = {}): string {
  // Alphabet must not be empty
  if (!alphabet) throw new Error('The alphabet must not be empty.')

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

// export function encodeTimestamp(alphabet = base58) {
//   const base = alphabet.length
//   const timestamp = Date.now()
//   console.log('Before encoding: ', timestamp) ///////////////////////////////
//   const maxTimestamp = 1000 * 60 * 60 * 24 * 365 * 4030 // Allows for up to the year 6000, reduces front-padding

//   let result = ''
//   let remaining = timestamp

//   while (remaining > 0 || result.length < Math.ceil(Math.log(maxTimestamp) / Math.log(base))) {
//     const index = remaining % base
//     result = alphabet[index] + result
//     remaining = Math.floor(remaining / base)
//   }

//   return result
// }

export function decodeLex({ encoded, maxYear = 6000, alphabet = BASE_58 }: DecodeLexOptions): Date {
  // Alphabet must not be empty
  if (!alphabet) throw new Error('The alphabet must not be empty.')

  // Validate the year. Must be later than the current year.
  if (maxYear <= 1970) throw new Error('The year must be later than 1970.')

  // Sort the alphabet
  alphabet = sortAlphabet(alphabet)

  // Find the length of the alphabet
  const base = alphabet.length

  // const maxMs = 1000 * 60 * 60 * 24 * 365 * (year - 1970)

  // // Find the maximum length of the timestamp, given the alphabet length
  // const timestampLength = Math.ceil(Math.log(maxMs) / Math.log(base))

  // const sortableCharacters = encoded.slice(0, timestampLength)

  // Convert the encoded timestamp back to a number
  let decoded = 0
  for (let i = 0; i < encoded.length; i++) {
    decoded = decoded * base + alphabet.indexOf(encoded[i])
  }

  return new Date(decoded)
}

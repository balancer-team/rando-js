import crypto from 'crypto'

type Options = {
  length?: number
  alphabet?: string
  sortable?: boolean
  separator?: string
}

type EncodeTimestampOptions = {
  alphabet?: string
}

type DecodeTimestampOptions = {
  encodedTimestamp: string
  alphabet?: string
}

// Add a max year option???? ///////////////////////

const base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

// Ensure that the alphabet is lexically sorted
export function sortAlphabet(alphabet: string): string {
  return alphabet.split('').sort().join('')
}

export function sid({ length = 22, alphabet = base58, sortable = false, separator = '' }: Options = {}): string {
  let result = sortable ? encodeTimestamp(alphabet) + separator : ''
  if (result.length >= length) console.warn('The length is shorter than the sortable characters.')
  const randomLength = length - result.length
  const arr = Array.from({ length: randomLength }, () => alphabet[crypto.randomInt(alphabet.length)])
  result = result + arr.join('')
  return result
}

export function encodeTimestamp(alphabet = base58) {
  const base = alphabet.length
  const timestamp = Date.now()
  console.log('Before encoding: ', timestamp) ///////////////////////////////
  const maxTimestamp = 1000 * 60 * 60 * 24 * 365 * 4030 // Allows for up to the year 6000, reduces front-padding

  let result = ''
  let remaining = timestamp

  while (remaining > 0 || result.length < Math.ceil(Math.log(maxTimestamp) / Math.log(base))) {
    const index = remaining % base
    result = alphabet[index] + result
    remaining = Math.floor(remaining / base)
  }

  return result
}

export function getTimestamp(id: string, alphabet = base58) {
  const base = alphabet.length

  // Find the maximum length of the timestamp, given the alphabet length and assuming maximum of the year 6000
  const timestampLength = Math.ceil(Math.log(1000 * 60 * 60 * 24 * 365 * 4030) / Math.log(base))

  const sortableCharacters = id.slice(0, timestampLength)

  // Convert the encoded timestamp back to a number
  let decoded = 0
  for (let i = 0; i < sortableCharacters.length; i++) {
    decoded = decoded * base + alphabet.indexOf(sortableCharacters[i])
  }

  console.log('After decoding: ', decoded) /////////////////////
  return new Date(decoded)
}

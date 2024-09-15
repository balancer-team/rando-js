import { Rando } from './'
import { BASE_58, BASE_32_CROCKFORD, NUMBERS, PASSWORD } from './constants'

// Rando
export const rando = new Rando()

// Creates a very short 10-character id (supports generating over 3,000 unique ids per ms)
export const randoShort = new Rando({
  randomLength: 2,
  includeTimestamp: true,
  obfuscateTimestamp: true,
})

// Creates a secure key with 256 bits of entropy
export const randoKey = new Rando({
  alphabet: BASE_58,
  randomLength: 44,
})

// Pin
export const randoPin = new Rando({
  alphabet: NUMBERS,
  randomLength: 6,
})

// Sortable (near UUIDv7 spec but with base 58)
export const randoSortable = new Rando({
  randomLength: 12,
  includeTimestamp: true,
  timestampPosition: 'start',
})

// ulid
export const randoUlid = new Rando({
  alphabet: BASE_32_CROCKFORD,
  randomLength: 16,
  includeTimestamp: true,
  timestampPosition: 'start',
  timestampLength: 10,
})

// Snowflake-like, not to spec
export const randoFlake = new Rando({
  includeTimestamp: true,
  alphabet: NUMBERS,
  randomLength: 6,
  timestampPosition: 'start',
})

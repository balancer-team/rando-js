import { Rando } from './'
import { BASE_58, BASE_32_CROCKFORD, NUMBERS, PASSWORD } from './constants'

// ulid
export const ulid = new Rando({
  alphabet: BASE_32_CROCKFORD,
  randomLength: 16,
  includeTimestamp: true,
  timestampPosition: 'start',
  timestampLength: 10,
})

// Pin
export const pin = new Rando({
  alphabet: NUMBERS,
  randomLength: 6,
})

// Password
export const password = new Rando({
  alphabet: PASSWORD,
  randomLength: 16,
})

// Sortable (near UUIDv7 spec but with base 58)
export const sortable = new Rando({
  alphabet: BASE_58,
  randomLength: 12,
  includeTimestamp: true,
  timestampPosition: 'start',
})

// Particle (short with hidden timestamp)
export const particle = new Rando({
  randomLength: 4,
  includeTimestamp: true,
  obfuscateTimestamp: true,
  timestampPosition: 'end',
})

// Creates a key with 256 bits of entropy
export const key = new Rando({
  alphabet: BASE_58,
  randomLength: 44,
})

// Creates an id that includes a machine identifier
export const machine = new Rando({
  includeTimestamp: true,
  separator: '-1-',
})

// Snowflake-like, not to spec
export const snowflake = new Rando({
  includeTimestamp: true,
  alphabet: NUMBERS,
  randomLength: 6,
  timestampPosition: 'start',
})

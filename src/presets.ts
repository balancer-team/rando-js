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

// Particle (short with hidden timestamp, not for high-frequency use)
export const particle = new Rando({
  alphabet: BASE_58,
  randomLength: 4,
  includeTimestamp: true,
  obfuscateTimestamp: true,
  timestampPosition: 'end',
})

export const key = new Rando({
  alphabet: BASE_58,
  randomLength: 44,
})

export const machine = new Rando({
  includeTimestamp: true,
  separator: '-1-',
})

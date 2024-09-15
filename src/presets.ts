import { Rando } from './'
import { NUMBERS } from './constants'

// Rando
export const rando = new Rando()

// Creates a very short id (supports generating over 3,000 unique ids per ms)
export const particle = new Rando({
  randomLength: 2,
  includeTimestamp: true,
  obfuscateTimestamp: true,
})

// Creates a secure key with 256 bits of entropy
export const novella = new Rando({
  randomLength: 44,
})

// Pin
export const pinto = new Rando({
  alphabet: NUMBERS,
  randomLength: 6,
})

// Sortable (near UUIDv7 spec but with base 58)
export const sortable = new Rando({
  randomLength: 12,
  includeTimestamp: true,
  timestampPosition: 'start',
})

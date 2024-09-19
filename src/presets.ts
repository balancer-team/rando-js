import { Rando } from './'
import { NUMBERS, CLEAN } from './constants'

// Rando (like a compact UUIDv4 with 6 extra entropy bits)
export const rando = new Rando()

// Particle (like a compact UUIDv7 with 6 extra entropy bits)
export const particle = new Rando({
  randomLength: 14,
  includeTimestamp: true,
})

// Tracker (hidden timestamp, can't assume unique)
export const tracker = new Rando({
  randomLength: 2,
  includeTimestamp: true,
  obfuscateTimestamp: true,
})

// Locker (creates a secure key with 256 bits of entropy)
export const locker = new Rando({
  randomLength: 44,
})

// Pin (for verification codes, etc)
export const pinto = new Rando({
  alphabet: NUMBERS,
  randomLength: 6,
})

// Slug (short, good readability, can't assume unique)
export const slug = new Rando({
  alphabet: CLEAN,
  randomLength: 8,
})

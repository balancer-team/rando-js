import { Rando } from './'
import { NUMBERS, CLEAN } from './constants'

// Rando (like a compact UUIDv4)
export const rando = new Rando()

// Particle (like a compact UUIDv7)
export const particle = new Rando({
  sortable: true,
})

// Locker (secure key with over 256 bits of entropy)
export const locker = new Rando({
  length: 44,
})

// Pin (for verification codes, etc)
export const pinto = new Rando({
  alphabet: NUMBERS,
  length: 6,
})

// Slug (prioritize shortness, not guaranteed unique)
export const slug = new Rando({
  alphabet: CLEAN,
  length: 12,
})

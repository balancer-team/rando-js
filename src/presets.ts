import { Rando } from './'
import { NUMBERS } from './constants'

// Rando
export const rando = new Rando()

// Creates a secure key with 256 bits of entropy
export const locker = new Rando({
  randomLength: 44,
})

// Pin
export const pinto = new Rando({
  alphabet: NUMBERS,
  randomLength: 6,
})

// Particle (like a compact UUIDv7 with 6 extra entropy bits)
export const particle = new Rando({
  randomLength: 14,
  includeTimestamp: true,
})

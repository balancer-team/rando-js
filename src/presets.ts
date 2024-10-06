import { Rando } from './'
import { NUMBERS, CLEAN, BASE_64_URL, PASSWORD } from './constants'

// Rando (like a compact UUIDv4 with 1 extra random bit)
export const rando = new Rando()

// Particle (like a compact UUIDv7 with 2 extra random bits)
export const particle = new Rando({
  sortable: true,
})

// Locker (creates a secure key with 256 bits of entropy)
export const locker = new Rando({
  length: 44,
})

// Milk (creates a secure key with an embedded timestamp and 128 bits of entropy)
export const milk = new Rando({
  length: 30,
  sortable: true,
})

// Pin (for verification codes, etc)
export const pinto = new Rando({
  alphabet: NUMBERS,
  length: 6,
})

// Trip (like a flight confirmation code)
// Similar to pinto but with a limit of 1 billion
export const trip = new Rando({
  alphabet: CLEAN,
  length: 6,
})

import { Rando } from './'
import { PASSWORD, BASE_42, NUMBERS } from './constants'

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

// Sesame (secure password with over 128 bits of entropy)
export const sesame = new Rando({
  alphabet: PASSWORD,
  length: 20,
})

// Pin (for verification codes, etc)
export const pinto = new Rando({
  alphabet: NUMBERS,
  length: 6,
})

// Slug (short, no vowels, sortable)
export const slug = new Rando({
  sortable: true,
  alphabet: BASE_42,
  length: 12,
})

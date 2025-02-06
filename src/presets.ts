import { Rando } from './'
import { PASSWORD, NUMBERS } from './constants'

// Rando (like a compact UUIDv4)
export const rando = new Rando()

// Particle (like a compact ObjectId)
export const particle = new Rando({
  length: 21,
  sortable: true,
})

// Locker (secure key with over 256 bits of entropy)
export const locker = new Rando({
  length: 48,
})

// Sesame (secure password with over 128 bits of entropy)
export const sesame = new Rando({
  alphabet: PASSWORD,
  length: 14,
})

// Pin (for verification codes, etc)
export const pinto = new Rando({
  alphabet: NUMBERS,
  length: 6,
})

// Slug (short, sortable)
export const slug = new Rando({
  length: 9,
  sortable: true,
})

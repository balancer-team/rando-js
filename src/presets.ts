import { Rando } from './'
import { PASSWORD, NUMBERS } from './constants'

// Rando (like a compact UUIDv4)
export const rando = new Rando()

// Sorto (like a compact UUIDv7)
export const sorto = new Rando({
  sortable: true,
})

// Locker (secure key with over 256 bits of entropy)
export const locker = new Rando({
  length: 46,
})

// Sesame (secure password with over 128 bits of entropy)
export const sesame = new Rando({
  alphabet: PASSWORD,
  length: 20,
})

// Pinto (for verification codes, etc)
export const pinto = new Rando({
  alphabet: NUMBERS,
  length: 6,
})

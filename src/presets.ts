import { Rando } from './'
import { NUMBERS, CLEAN, PASSWORD } from './constants'

// Rando (like a compact UUIDv4 with 6 extra entropy bits)
export const rando = new Rando()

// Particle (like a compact UUIDv7 with 6 extra entropy bits)
export const particle = new Rando({
  randomLength: 13,
  includeTimestamp: true,
})

// // Tracker (hidden timestamp, can't assume unique)
// export const tracker = new Rando({
//   randomLength: 2,
//   includeTimestamp: true,
//   obfuscateTimestamp: true,
// })

// Locker (creates a secure key with 256+ bits of entropy)
export const locker = new Rando({
  randomLength: 44,
})

// Sesame (for passwords)
export const sesame = new Rando({
  randomLength: 16,
  alphabet: PASSWORD,
  requireAllClasses: true,
})

// Pin (for verification codes, etc)
export const pinto = new Rando({
  alphabet: NUMBERS,
  randomLength: 6,
})

// Slug (short, readable, profanity-resistant, hidden timestamp)
export const slug = new Rando({
  alphabet: CLEAN,
  randomLength: 3,
  includeTimestamp: true,
  obfuscateTimestamp: true,
})

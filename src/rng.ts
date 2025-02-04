let rng: (max: number) => number

// Check if we're in Node.js environment
if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  const { randomInt } = require('crypto')
  rng = randomInt
  // Check if we're in a browser environment
} else if (typeof globalThis !== 'undefined' && 'crypto' in globalThis && 'getRandomValues' in globalThis.crypto) {
  // Browser implementation of randomInt using Web Crypto API
  rng = (max: number) => {
    const array = new Uint32Array(1)
    globalThis.crypto.getRandomValues(array)
    return array[0] % max
  }
} else {
  throw new Error('No secure random number generator available.')
}

export { rng }

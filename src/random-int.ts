let randomInt: (max: number) => number

// Check if we're in Node.js environment
if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  const { randomInt: nodeRandomInt } = require('crypto')
  randomInt = nodeRandomInt
  // Check if we're in a browser environment
} else if (typeof globalThis !== 'undefined' && 'crypto' in globalThis && 'getRandomValues' in globalThis.crypto) {
  // Browser implementation of randomInt using Web Crypto API
  randomInt = (max: number) => {
    const array = new Uint32Array(1)
    globalThis.crypto.getRandomValues(array)
    return array[0] % max
  }
} else {
  throw new Error('No secure random number generator available.')
}

export { randomInt }

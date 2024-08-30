import crypto from 'crypto'

// Default base 58 alphabet, 5.9 bits per character, 22 characters, 128.9 random bits
// Compare to UUIDv4, which has 122 random bits
// Base 58 omits 0, O, I, l for readability
export function sid({
  length = 22,
  alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
  prefix = '',
}: {
  length?: number
  alphabet?: string
  prefix?: string
} = {}): string {
  const arr = new Array(length)
  for (let i = 0; i < length; i++) {
    arr[i] = alphabet[crypto.randomInt(alphabet.length)]
  }
  return prefix + arr.join('')
}

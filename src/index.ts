import crypto from 'crypto'

// Defaults to base 32 alphabet, 5 bits per character, 25 characters, 125 bits
// Compare to UUIDv4, which has 122 random bits
// Omits 0, o, i, l, u to improve readability in cases where id may need to be manually read
export function sid({
  length = 25,
  alphabet = '123456789abcdefghjkmnpqrstuvwxyz',
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

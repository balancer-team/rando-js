import crypto from 'crypto'

type Options = {
  length?: number
  alphabet?: string
  prefix?: string
}

export function sid({
  length = 22,
  alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
  prefix = '',
}: Options = {}): string {
  const a = Array.from({ length }, () => alphabet[crypto.randomInt(alphabet.length)])
  return prefix + a.join('')
}

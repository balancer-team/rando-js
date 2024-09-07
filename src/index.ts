import crypto from 'crypto'
import { BASE_58, DATE_MAP } from './constants'
import { sortAlphabet } from './utils'

type LexOptions = {
  date?: Date
  alphabet?: string
  maxDate?: Date | null
}

type RandoOptions = {
  length?: number
  alphabet?: string
}

export function lex({ date = new Date(), alphabet = BASE_58, maxDate = null }: LexOptions = {}): string {
  // Alphabet must be at least two characters long
  if (alphabet.length < 2) throw new Error('The alphabet must be at least two characters long.')

  if (!maxDate) maxDate = DATE_MAP[alphabet.length]

  // Ensure the alphabet is lexicographically sorted
  alphabet = sortAlphabet(alphabet)

  // Convert the date and maxDate to timestamps
  const timestamp = date.getTime()
  const maxTimestamp = maxDate.getTime()

  let result = ''
  let remaining = timestamp

  while (remaining > 0 || result.length < Math.ceil(Math.log(maxTimestamp) / Math.log(alphabet.length))) {
    const index = remaining % alphabet.length
    result = alphabet[index] + result
    remaining = Math.floor(remaining / alphabet.length)
  }

  return result
}

export function rando({ length = 22, alphabet = BASE_58 }: RandoOptions = {}): string {
  // Length must be greater than 0
  if (length <= 0) throw new Error('The length must be greater than 0.')

  // Alphabet must be at least two characters long
  if (alphabet.length < 2) throw new Error('The alphabet must be at least two characters long.')

  const a = Array.from({ length }, () => alphabet[crypto.randomInt(alphabet.length)])
  return a.join('')
}

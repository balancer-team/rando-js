import crypto from 'crypto'
import { BASE_58, DATE_MAP } from './constants'
import { sortAlphabet } from './utils'

type RandoOptions = {
  length?: number
  alphabet?: string
  isSortable?: boolean
  separator?: string
  date?: Date
  maxDate?: Date | null
}

export function rando({
  length = 22,
  alphabet = BASE_58,
  isSortable = false,
  separator = '',
  date = new Date(),
  maxDate = null,
}: RandoOptions = {}): string {
  let sortableString = ''
  let randomString = ''

  // Length must be greater than 0
  if (length <= 0) throw new Error('The length must be greater than 0.')

  // Alphabet must be at least two characters long
  if (alphabet.length < 2) throw new Error('The alphabet must be at least two characters long.')

  // Generate the sortable string
  if (isSortable) {
    sortableString = sortable({ alphabet, date, maxDate })
    length = length - sortableString.length
  }

  // Generate the random string
  const randomArray = Array.from({ length }, () => alphabet[crypto.randomInt(alphabet.length)])
  randomString = randomArray.join('')

  // Return the combined string
  return sortableString + separator + randomString
}

type SortableOptions = {
  date?: Date
  alphabet?: string
  maxDate?: Date | null
}

export function sortable({ alphabet = BASE_58, date = new Date(), maxDate = null }: SortableOptions = {}): string {
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

import { BASE_58 } from './constants'

type DecodeLexOptions = {
  encoded: string
  alphabet?: string
}

// Ensures the alphabet is lexicographically sorted
export function sortAlphabet(alphabet: string): string {
  return alphabet.split('').sort().join('')
}

export function decodeLex({ encoded, alphabet = BASE_58 }: DecodeLexOptions): Date {
  // Alphabet must not be empty
  if (!alphabet) throw new Error('The alphabet must not be empty.')

  // Validate the year. Must be later than the current year.
  // if (maxYear <= 1970) throw new Error('The year must be later than 1970.')

  // Sort the alphabet
  alphabet = sortAlphabet(alphabet)

  // Find the length of the alphabet
  const base = alphabet.length

  // Convert the encoded timestamp back to a number
  let decoded = 0
  for (let i = 0; i < encoded.length; i++) {
    decoded = decoded * base + alphabet.indexOf(encoded[i])
  }

  return new Date(decoded)
}

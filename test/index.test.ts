import test from 'node:test'
import assert from 'node:assert'
import { rando, lex, decodeLex } from '../src'

test('Rando default length', () => {
  assert.strictEqual(rando().length, 22)
})

test('Rando with custom length', () => {
  assert.strictEqual(rando({ length: 44 }).length, 44)
})

// Changing the alphabet to one character returns a string of that character
test('Rando with custom alphabet', () => {
  assert.strictEqual(rando({ alphabet: 'a' }), 'aaaaaaaaaaaaaaaaaaaaaa')
})

test('Date matches after encoding and decoding', () => {
  const date = new Date()
  const id = lex({ date })
  const decodedDate = decodeLex({ encoded: id })
  assert.strictEqual(date.getTime(), decodedDate.getTime())
})

test('Date matches after encoding and decoding with options', () => {
  const date = new Date()
  const id = lex({ date, alphabet: '0123456789', maxYear: 4000 })
  const decodedDate = decodeLex({ encoded: id, alphabet: '0123456789', maxYear: 4000 })
  assert.strictEqual(date.getTime(), decodedDate.getTime())
})

import test from 'node:test'
import assert from 'node:assert'
import { rando, lex, decodeLex, ulid, flake, fav, lexPracticalMaximums } from '../src'

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
  const decodedDate = decodeLex({ encoded: id, alphabet: '0123456789' })
  assert.strictEqual(date.getTime(), decodedDate.getTime())
})

test('Generate to ulid spec', () => {
  const lexOptions = {
    alphabet: '0123456789ABCDEFGHJKMNPQRSTVWXYZ', // Crockford's base32
    maxYear: 10889, // ulid spec
  }

  const randoOptions = {
    length: 16, // 80 bits of entropy
    alphabet: '0123456789ABCDEFGHJKMNPQRSTVWXYZ', // Crockford's base32
  }

  const id = lex(lexOptions) + rando(randoOptions)

  assert.strictEqual(id.length, 26)
})

// test('Generate ulid', () => {
//   console.log(ulid())
// })

// test('Generate snowflake-like id', () => {
//   console.log(flake())
// })

test('Generate fav', () => {
  console.log(lex())
  console.log(lex({ date: new Date('6000-01-02') }))
  lexPracticalMaximums()
  // console.log(crumb())
})

// 17256643061560183958186

// 285124269753503744

// 285124269753503744

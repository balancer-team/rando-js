import test from 'node:test'
import assert from 'node:assert'
// import { rando, lex } from '../src'
// import { decodeLex } from '../src/utils'
// import { getPracticalSortableLengths } from '../src/temp'

// test('Rando default length', () => {
//   assert.strictEqual(rando().length, 22)
// })

// test('Rando with custom length', () => {
//   assert.strictEqual(rando({ length: 44 }).length, 44)
// })

// // Changing the alphabet to one character returns a string of that character
// test('Rando with custom alphabet', () => {
//   assert.strictEqual(rando({ alphabet: 'a' }), 'aaaaaaaaaaaaaaaaaaaaaa')
// })

// test('Date matches after encoding and decoding', () => {
//   const date = new Date()
//   const id = lex({ date })
//   const decodedDate = decodeLex({ encoded: id })
//   assert.strictEqual(date.getTime(), decodedDate.getTime())
// })

// test('Date matches after encoding and decoding with options', () => {
//   const date = new Date()
//   const id = lex({ date, alphabet: '0123456789', maxDate: new Date('4000-01-01') })
//   const decodedDate = decodeLex({ encoded: id, alphabet: '0123456789' })
//   assert.strictEqual(date.getTime(), decodedDate.getTime())
// })

// test('Generate to ulid spec', () => {
//   const lexOptions = {
//     alphabet: '0123456789ABCDEFGHJKMNPQRSTVWXYZ', // Crockford's base32
//     maxYear: 10889, // ulid spec
//   }

//   const randoOptions = {
//     length: 16, // 80 bits of entropy
//     alphabet: '0123456789ABCDEFGHJKMNPQRSTVWXYZ', // Crockford's base32
//   }

//   const id = lex(lexOptions) + rando(randoOptions)

//   assert.strictEqual(id.length, 26)
// })

// test('Test', () => {
//   console.log(getPracticalSortableLengths())
// })

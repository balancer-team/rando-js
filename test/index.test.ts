import test from 'node:test'
import assert from 'node:assert'
import { sid, getTimestamp } from '../src'

// // Default sid is 25 characters
// test('sid default', () => {
//   assert.strictEqual(sid().length, 22)
// })

// // Adjusting the length changes the length of the sid
// test('sid with length', () => {
//   assert.strictEqual(sid({ length: 44 }).length, 44)
// })

// // Changing the alphabet to one character returns a string of that character
// test('sid with alphabet', () => {
//   assert.strictEqual(sid({ alphabet: 'a' }), 'aaaaaaaaaaaaaaaaaaaaaa')
// })

// // Adding a prefix returns a sid that starts with that prefix
// test('sortable', () => {
//   const sortableId = sid({ length: 1, precision: 'seconds', sortable: true })
//   console.log(sortableId)
//   // assert.strictEqual(sid({ sortable: true }).startsWith('test_'), true)
// })

test('sid default', () => {
  const id = sid({ sortable: true })
  console.log(id)
  getTimestamp(id)
  // assert.strictEqual(sid().length, 22)
})

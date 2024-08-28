import test from 'node:test'
import assert from 'node:assert'
import { sid } from '../src'

// Default sid is 25 characters
test('sid default', () => {
  assert.strictEqual(sid().length, 22)
})

// Adjusting the length changes the length of the sid
test('sid with length', () => {
  assert.strictEqual(sid({ length: 44 }).length, 44)
})

// Changing the alphabet to one character returns a string of that character
test('sid with alphabet', () => {
  assert.strictEqual(sid({ alphabet: 'a' }), 'aaaaaaaaaaaaaaaaaaaaaa')
})

// Adding a prefix returns a sid that starts with that prefix
test('sid with prefix', () => {
  assert.strictEqual(sid({ prefix: 'test_' }).startsWith('test_'), true)
})

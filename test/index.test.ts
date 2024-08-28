import test from 'node:test'
import assert from 'node:assert'
import { sid } from '../src'

// Default sid is 25 characters
test('sid default length', () => {
  assert.strictEqual(sid().length, 25)
})

// Adjusting the length changes the length of the sid
test('sid with length', () => {
  assert.strictEqual(sid({ length: 10 }).length, 10)
})

// Changing the alphabet to one character returns a string of that character
test('sid with alphabet', () => {
  assert.strictEqual(sid({ alphabet: 'a' }), 'aaaaaaaaaaaaaaaaaaaaaaaaa')
})

// Adding a prefix returns a sid that starts with that prefix
test('sid with prefix', () => {
  assert.strictEqual(sid({ prefix: 'test_' }).startsWith('test_'), true)
})

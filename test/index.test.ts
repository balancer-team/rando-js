import test from 'node:test'
import assert from 'node:assert'
import { Rando } from '../src'
import { NUMBERS, BASE_32_CROCKFORD } from '../src/constants'
import { rando, particle, locker, pinto } from '../src/presets'

test('Rando default', () => {
  const rando = new Rando()
  assert.strictEqual(rando.generate().length, 22)
})

test('Rando with custom length', () => {
  const rando = new Rando({ randomLength: 44 })
  assert.strictEqual(rando.generate().length, 44)
})

test('Rando with custom alphabet', () => {
  const rando = new Rando({ alphabet: 'ab' })
  assert.strictEqual(
    rando
      .generate()
      .split('')
      .every((char) => 'ab'.includes(char)),
    true
  )
})

test('Timestamp at start', () => {
  const rando = new Rando({ includeTimestamp: true, timestampPosition: 'start' })
  const id = rando.generate()
  assert.strictEqual(id.length, 30)
  assert.strictEqual(id.startsWith('1'), true)
})

test('Timestamp at end', () => {
  const rando = new Rando({ includeTimestamp: true, timestampPosition: 'end' })
  const id = rando.generate()
  assert.strictEqual(id.length, 30)
  assert.strictEqual(id.charAt(22), '1')
})

test('Date matches after encode and decode with timestamp at start', () => {
  const date = new Date()
  const rando = new Rando({ includeTimestamp: true, timestampPosition: 'start' })
  const id = rando.generate({ date })
  assert.strictEqual(date.getTime(), rando.getDate(id).getTime())
})

test('Date matches after encode and decode with timestamp at end', () => {
  const date = new Date()
  const rando = new Rando({ includeTimestamp: true, timestampPosition: 'end' })
  const id = rando.generate({ date })
  assert.strictEqual(date.getTime(), rando.getDate(id).getTime())
})

test('Date matches after encode and decode with obfuscated timestamp', () => {
  const date = new Date()
  const rando = new Rando({
    includeTimestamp: true,
    timestampPosition: 'end',
    obfuscateTimestamp: true,
    timestampAlphabet: BASE_32_CROCKFORD,
    separator: '-',
  })
  const id = rando.generate({ date })
  assert.strictEqual(date.getTime(), rando.getDate(id).getTime())
})

test('Date matches after encode and decode with all options', () => {
  const date = new Date()
  const rando = new Rando({
    includeTimestamp: true,
    timestampPosition: 'start',
    obfuscateTimestamp: true,
    timestampAlphabet: NUMBERS,
    timestampLength: 16,
    prefix: '-',
    separator: '-',
    suffix: '-',
  })
  assert.strictEqual(date.getTime(), rando.getDate(rando.generate({ date })).getTime())
})

test('Throws an error if timestamp length is too short', () => {
  assert.throws(() => {
    new Rando({
      includeTimestamp: true,
      timestampLength: 7,
    })
  })
})

test('Info returns bits of entropy', () => {
  const rando = new Rando()
  assert.strictEqual(rando.getInfo().randomEntropy, 128)
})

test('Rando preset', () => {
  assert.strictEqual(rando.generate().length, 22)
})

test('Locker preset', () => {
  assert.strictEqual(locker.generate().length, 44)
})

test('Pinto preset', () => {
  assert.strictEqual(pinto.generate().length, 6)
})

test('Particle preset', () => {
  assert.strictEqual(particle.generate().length, 22)
})

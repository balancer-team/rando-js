import test from 'node:test'
import assert from 'node:assert'
import { Rando } from '../src'
import { HEX } from '../src/constants'
import { rando, particle, locker, sesame, pinto, slug } from '../src/presets'

test('Rando default', () => {
  const rando = new Rando()
  assert.strictEqual(rando.generate().length, 24)
})

test('Rando with custom length', () => {
  const rando = new Rando({ length: 32 })
  assert.strictEqual(rando.generate().length, 32)
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

test('Date matches after encode and decode', () => {
  const date = new Date()
  const rando = new Rando({ sortable: true })
  const id = rando.generate({ date })
  assert.strictEqual(date.getTime(), rando.getDate(id)?.getTime())
})

test('Date matches after encode and decode with custom alphabet', () => {
  const date = new Date()
  const rando = new Rando({
    sortable: true,
    alphabet: HEX,
  })
  const id = rando.generate({ date })
  assert.strictEqual(date.getTime(), rando.getDate(id)?.getTime())
})

test('Date matches after encode and decode with all options', () => {
  const date = new Date()
  const rando = new Rando({
    alphabet: HEX,
    length: 22,
    sortable: true,
    supportDate: new Date('5022-01-01'),
  })
  const id = rando.generate({ date })
  assert.strictEqual(date.getTime(), rando.getDate(id)?.getTime())
})

test('Info returns bits of entropy', () => {
  const rando = new Rando()
  assert.strictEqual(Math.floor(rando.randomBits), 131)
})

test('Get invalid date', () => {
  const rando = new Rando({ sortable: true })
  assert.strictEqual(rando.getDate('OIl0'), null)
})

test('Rando preset', () => {
  assert.strictEqual(rando.generate().length, 24)
})

test('Particle preset', () => {
  assert.strictEqual(particle.generate().length, 21)
})

test('Locker preset', () => {
  assert.strictEqual(locker.generate().length, 48)
})

test('Sesame preset', () => {
  assert.strictEqual(sesame.generate().length, 14)
})

test('Pinto preset', () => {
  const pin = pinto.generate()
  assert.strictEqual(/^\d{6}$/.test(pin), true)
})

test('Slug preset', () => {
  assert.strictEqual(slug.generate().length, 9)
})

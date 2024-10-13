import test from 'node:test'
import assert from 'node:assert'
import { Rando } from '../src'
import { CLEAN } from '../src/constants'
import { rando, particle, locker, pinto, slug } from '../src/presets'
import { generateSortableGuidance } from '../src/analytics'

test('Rando default', () => {
  const rando = new Rando()
  assert.strictEqual(rando.generate().length, 22)
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
    alphabet: CLEAN,
  })
  const id = rando.generate({ date })
  assert.strictEqual(date.getTime(), rando.getDate(id)?.getTime())
})

test('Date matches to within 1 hour with trimmed timestamp', () => {
  const date = new Date()
  const rando = new Rando({
    alphabet: CLEAN,
    sortable: true,
    length: 5,
  })
  const id = rando.generate({ date })
  const decodedDate = rando.getDate(id)
  if (!decodedDate) assert.fail('Date not found')
  const diff = date.getTime() - decodedDate.getTime()
  assert.strictEqual(diff < 1000 * 60 * 60, true)
})

test('Date matches after encode and decode with all options', () => {
  const date = new Date()
  const rando = new Rando({
    alphabet: CLEAN,
    length: 22,
    sortable: true,
    supportDate: new Date('5022-01-01'),
    secret: 'secret',
  })
  const id = rando.generate({ date })
  assert.strictEqual(date.getTime(), rando.getDate(id)?.getTime())
})

test('Info returns bits of entropy', () => {
  const rando = new Rando()
  assert.strictEqual(Math.floor(rando.randomBits), 128)
})

test('Rando preset', () => {
  assert.strictEqual(rando.generate().length, 22)
})

test('Particle preset', () => {
  particle.secret = 'secret'
  assert.strictEqual(particle.generate().length, 22)
})

test('Locker preset', () => {
  assert.strictEqual(locker.generate().length, 44)
})

test('Pinto preset', () => {
  const pin = pinto.generate()
  assert.strictEqual(/^\d{6}$/.test(pin), true)
})

test('Slug preset', () => {
  assert.strictEqual(slug.generate().length, 6)
})

test('Get invalid date', () => {
  const rando = new Rando({ sortable: true })
  assert.strictEqual(rando.getDate('OIl0'), null)
})

test('Sign and verify', () => {
  rando.secret = 'secret'
  const id = rando.generate()
  const signed = rando.sign(id)
  const verified = rando.verify(signed)
  if (!verified) assert.fail('Verification failed')
  assert.strictEqual(verified, id)
})

test('Sign and verify fails with modified id', () => {
  particle.secret = 'secret'
  const id = particle.generate()
  let signed = particle.sign(id)
  signed = 3 + signed.slice(1)
  const verified = particle.verify(signed)
  assert.strictEqual(verified, null)
})

test('Consistent signature length', () => {
  particle.secret = 'secret'
  for (let i = 0; i < 100; i++) {
    const id = particle.generate()
    const signed = particle.sign(id)
    assert.strictEqual(signed.length, 66)
  }
})

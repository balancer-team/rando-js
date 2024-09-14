import test from 'node:test'
import assert from 'node:assert'
import { Rando } from '../src'
import { NUMBERS, BASE_32_CROCKFORD } from '../src/constants'
import { ulid, pin, password, sortable, particle, machine } from '../src/presets'

// test('test', () => {
//   const rando = new Rando({ timestamp: { position: 'start', separator: '-', obfuscate: true } })
//   const id = rando.generate()
//   console.log(id)
//   const date = rando.getDate(id)
//   console.log(date)
//   assert.strictEqual(rando.generate().length, 31)
// })

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
    separator: '-',
  })
  assert.strictEqual(date.getTime(), rando.getDate(rando.generate({ date })).getTime())
})

test('Throws an error if timestamp length is too short', () => {
  assert.throws(
    () =>
      new Rando({
        includeTimestamp: true,
        timestampLength: 7,
      })
  )
})

test('Info returns bits of entropy', () => {
  const rando = new Rando()
  assert.strictEqual(rando.getInfo().randomEntropy, 128)
})

// test('Presets', () => {
//   console.log('ulid: ' + ulid.generate())
//   console.log(ulid.getInfo())
//   // assert.strictEqual(ulid.generate().length, 26)
//   console.log('pin: ' + pin.generate())
//   console.log(pin.getInfo())
//   // assert.strictEqual(pin.generate().length, 6)
//   console.log('password: ' + password.generate())
//   console.log(password.getInfo())
//   // assert.strictEqual(password.generate().length, 16)
//   console.log('sortable: ' + sortable.generate())
//   console.log(sortable.getInfo())
//   // assert.strictEqual(sortable.generate().length, 12)
//   console.log('particle: ' + particle.generate())
//   console.log(particle.getInfo())
// })

// Test how many particles can be generated in a second
test('Particle performance', () => {
  // const rando = new Rando({
  //   alphabet: NUMBERS,
  //   randomLength: 4,
  //   includeTimestamp: true,
  //   timestampSeparator: '-',
  // })
  // const start = Date.now()
  let i = 0
  while (i < 20) {
    console.log(machine.generate())
    i++
  }
  console.log(machine.getInfo())
})

// // DXq2aMvm2mHA

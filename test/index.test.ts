import test from 'node:test'
import assert from 'node:assert'
import { Rando } from '../src'

test('Rando default', () => {
  const rando = new Rando()
  assert.strictEqual(rando.generate().length, 22)
})

test('Rando with custom length', () => {
  const rando = new Rando({ length: 44 })
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

test('Sortable prefix', () => {
  const rando = new Rando({ sortable: 'prefix' })
  assert.strictEqual(rando.generate().length, 30)
  assert.strictEqual(rando.generate().startsWith('1'), true)
})

test('Sortable suffix', () => {
  const rando = new Rando({ sortable: 'suffix' })
  assert.strictEqual(rando.generate().length, 30)
  assert.strictEqual(rando.generate().charAt(22), '1')
})

test('Date matches after encode and decode with prefix', () => {
  const date = new Date()
  const rando = new Rando({ sortable: 'prefix' })
  const id = rando.generate({ date })
  assert.strictEqual(date.getTime(), rando.getDate(id).getTime())
})

test('Date matches after encode and decode with suffix', () => {
  const date = new Date()
  const rando = new Rando({ sortable: 'suffix' })
  const id = rando.generate({ date })
  assert.strictEqual(date.getTime(), rando.getDate(id).getTime())
})

test('Date matches after encode and decode with all options', () => {
  const date = new Date()
  const rando = new Rando({
    sortable: 'prefix',
    sortableSeparator: '-',
    sortableLength: 16,
    sortableAlphabet: '0123456789',
  })
  const id = rando.generate({ date })
  assert.strictEqual(date.getTime(), rando.getDate(id).getTime())
})

test('Sortable throws an error if length is too short', () => {
  assert.throws(() => new Rando({ sortable: 'prefix', sortableLength: 7 }))
})

test('Info returns bits of entropy', () => {
  const rando = new Rando()
  assert.strictEqual(rando.getInfo().bitsOfEntropy, 128.87)
})

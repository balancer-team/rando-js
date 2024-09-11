import test from 'node:test'
import assert from 'node:assert'
import { generateSortableDefaults } from '../src/analytics'
import { Rando } from '../src'

test('Rando default', () => {
  const rando = new Rando()
  assert.strictEqual(rando.generate().length, 22)
})

test('Rando with custom length', () => {
  const rando = new Rando({ randomLength: 44 })
  assert.strictEqual(rando.generate().length, 44)
})

test('Rando with custom alphabet', () => {
  const rando = new Rando({ randomAlphabet: 'ab' })
  assert.strictEqual(
    rando
      .generate()
      .split('')
      .every((char) => 'ab'.includes(char)),
    true
  )
})

test('Sortable with date', () => {
  const rando = new Rando({ isSortable: true })
  assert.strictEqual(rando.generate().length, 30)
})

test('Date matches after encode and decode', () => {
  const date = new Date()
  const rando = new Rando({ isSortable: true })
  const id = rando.generate({ date })
  assert.strictEqual(date.getTime(), rando.decodeSortable(id).getTime())
})

test('Date matches after encode and decode with all options', () => {
  const date = new Date()
  const rando = new Rando({
    isSortable: true,
    sortableSeparator: '-',
    sortableLength: 16,
    sortableAlphabet: '0123456789',
  })
  const id = rando.generate({ date })
  assert.strictEqual(date.getTime(), rando.decodeSortable(id).getTime())
})

test('Sortable throws error if length is too short', () => {
  assert.throws(() => new Rando({ isSortable: true, sortableLength: 7 }))
})

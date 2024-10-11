/**
 * Generates and logs the default timestamp lengths and maximum dates for different bases.
 * The function calculates the length of the string representation of a timestamp for bases ranging from 2 to 128.
 * It also determines the maximum date that can be represented with that length.
 *
 * @returns {void}
 */

export function generateSortableGuidance(): void {
  const targetTimestamp = new Date('3000-01-01').getTime()

  console.log('|Base|Length|Max Year|')
  console.log('|---|---|---|')
  for (let base = 2; base <= 64; base++) {
    // Find the length of a string represntation of a timestamp, given the base
    let length = 1
    let maxTimestamp = Math.pow(base, length)

    while (maxTimestamp < targetTimestamp) {
      length++
      maxTimestamp = Math.pow(base, length)
    }

    // Find the maximum date for the given length
    let maxDate = new Date(maxTimestamp)
    // if (maxDate > new Date('9999-12-31')) maxDate = new Date('9999-12-31')
    // const maxDateString = maxDate.toISOString().split('T')[0]
    const maxYear = maxDate.getFullYear()
    // maxTimestamp = maxDate.getTime()

    console.log(`|${base}|${length}|${maxYear}|`)
  }
}

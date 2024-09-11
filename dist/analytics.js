"use strict";
// import { BASE_58, BASE_64_URL } from './constants'
// import { lex } from './index'
// import { decodeLex, sortAlphabet } from './utils'
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSortableDefaults = generateSortableDefaults;
// TODO organize and rename
// // Lists practical ranges, given an alphabet
// export function getPracticalRanges(alphabet: string): void {
//   alphabet = sortAlphabet(alphabet)
//   const now = new Date()
//   // Get the first and last character in the alphabet
//   const firstCharacter = alphabet[0]
//   const lastCharacter = alphabet[alphabet.length - 1]
//   // Get the maximum time in JavaScript
//   let date = new Date(8640000000000000)
//   console.log('------------------------------------------')
//   while (date > now) {
//     let maxString = lex({ date, alphabet, maxDate: date })
//     let maxDate = date.toISOString().split('T')[0]
//     let length = maxString.length
//     let minString = firstCharacter.repeat(length)
//     console.log(`String Range:   ${minString} - ${maxString}`)
//     console.log(`Date Range:     1970-01-01 - ${maxDate}`)
//     console.log(`Example:        ${lex({ alphabet, maxDate: date })}`)
//     console.log('------------------------------------------')
//     date = decodeLex({ encoded: lastCharacter.repeat(length - 1), alphabet })
//   }
// }
// export function practicalMaxDate(alphabet: string = BASE_58): Date {
//   alphabet = sortAlphabet(alphabet)
//   // Generate a string for the year 3000
//   const practicalFutureString = lex({ date: new Date('3000-01-01'), alphabet })
//   const length = practicalFutureString.length
//   const lastCharacter = alphabet[alphabet.length - 1]
//   // Decode the string to get the date
//   return decodeLex({ encoded: lastCharacter.repeat(length), alphabet })
// }
// export function generatePracticalMaxDates(): void {
//   for (let i = 2; i <= 64; i++) {
//     let date = practicalMaxDate(BASE_64_URL.slice(0, i))
//     if (date > new Date('9999-12-31')) date = new Date('9999-12-31')
//     const dateString = date.toISOString().split('T')[0]
//     console.log(`${i}: new Date('${dateString}'),`)
//   }
//   // Create a loop for variable i from 1 to 64
//   // For each i, generate the practical max date
//   // Print the date as a string
// }
function generateSortableDefaults() {
    const targetTimestamp = new Date('3000-01-01').getTime();
    for (let base = 2; base <= 128; base++) {
        // Find the length of a string represntation of a timestamp, given the base
        let length = 1;
        let maxTimestamp = Math.pow(base, length);
        while (maxTimestamp < targetTimestamp) {
            length++;
            maxTimestamp = Math.pow(base, length);
        }
        // Find the maximum date for the given length
        let maxDate = new Date(maxTimestamp);
        // if (maxDate > new Date('9999-12-31')) maxDate = new Date('9999-12-31')
        const maxDateString = maxDate.toISOString().split('T')[0];
        const maxYear = maxDate.getFullYear();
        // maxTimestamp = maxDate.getTime()
        console.log(`${base}: { length: ${length}, timestamp: ${maxTimestamp}, year: ${maxYear} },`);
    }
    return 'done';
}

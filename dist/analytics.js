"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTimestampDefaults = generateTimestampDefaults;
function generateTimestampDefaults() {
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

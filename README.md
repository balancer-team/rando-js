# Rando

Rando is a tool for generating identifiers. By default `rando()` generates a cryptographically random, universally unique identifier with 22 characters and 128 bits of entropy. Options can be modified to fit a variety of project requirements.

### Install

```
npm i @balancer-team/rando
```

### Basic Usage

Import the rando class and create an instance. The instance generates IDs with the `generate()` method.

```js
import { Rando } from '@balancer-team/rando'

const rando = new Rando()
rando.generate() // => "ogm3Yzf4NSKJsDnL8ma8Xn" (128 bits of entropy)
```

### Customizing the Length

If you want a longer random string, for example if you wanted more security for an API key, it is easy to modify the length:

```js
const randoKey = new Rando({ randomLength: 44 })
randoKey.generate() //=> "NfHRpTLJkjXcKmprjcpQ4UgRfL4KKEGoSrBLytf5RD44" (256 bits of entropy)
```

### Sortable Identifiers

Rando has powerful features that enable you to generate lexicographically sortable IDs.

```js
const randoSortable = new Rando({ isSortable: true, sortableSeparator: '-' })
randoSortable.generate() //=> "1nLnXM5B-VUQBxRu1W4Jw6nBkLzhhGp"

// "1nLnXM5B-VUQBxRu1W4Jw6nBkLzhhGp"
//  |------| |--------------------|
//  Sortable         Random
//  Segment          Segment
```

Sortable IDs can be decoded to return a date object.

```js
randoSortable.decodeSortable('1nLnXM5B-VUQBxRu1W4Jw6nBkLzhhGp') //=> 2024-09-11T17:51:46.274Z
```

### All Options

Rando instances can be extensively customized. Here are all the availble options:

```js
type RandoOptions = {
  alphabet?: string
  randomLength?: number
  randomAlphabet?: string
  isSortable?: boolean
  sortableSeparator?: string
  sortableAlphabet?: string
  sortableLength?: number
  sortableDate?: Date
  sortableMaxDate?: Date
  sortableTrim?: number
}
```

- `alphabet` is a string of characters you want to use to generate your IDs. By default, the base 58 alphabet is used for a good balance of human-readability, URL safety, and entropy.

- `randomLength` is the output length of the random segment of the ID. By default, the `randomLength` is `22` which provides 128 bits of entropy with a base 58 alphabet.

- `randomAlphabet` allows you to specify an alphabet for the random segment of the ID.

- `isSortable` if set to true, adds a sortable segment in front of the random segment. The sortable segment provides millisecond precision.

- `sortableSeparator` adds a string in between the sortable and random segments of the ID. By default, this is an empty string.

- `sortableAlphabet` allows you to specify an alphabet for the sortable segment of the ID.

- `sortableLength` allows you to specify the length of the sortable segment of the ID. Rando uses practical default lengths that vary depending on the size of the alphabet. The defaults provide support for at least the year 3000 for any alphabet length from `2` to `88`. A longer sortable segment is needed with a 16-character `HEX` alphabet than with a `BASE_64` alphabet to represent the same date. If you increase the length beyond what is necessary, the sortable segment will be left-padded to allow you to represent dates further into the future. If you decrease the length below what is necessary, the instance will return an error.

- `sortableDate` allows you to set a specific date for the sortable segment.

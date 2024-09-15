# Rando

Rando is a tool for generating identifiers. By default, `rando()` generates a cryptographically random, universally unique identifier with 22 characters and 128 bits of entropy. Options can be modified to fit a wide variety of ID requirements.

### Install

```
npm i @balancer-team/rando
```

### Basic Usage

Import the rando class and create an instance. The instance generates IDs with the `generate()` method.

```js
import { Rando } from '@balancer-team/rando'

const rando = new Rando()
rando.generate() // => "ogm3Yzf4NSKJsDnL8ma8Xn"
```

### Customizing the Length

If you want a longer random string, for example if you wanted extra entropy for an API key, it is easy to modify the length:

```js
const rando = new Rando({ length: 44 })
rando.generate() //=> "NfHRpTLJkjXcKmprjcpQ4UgRfL4KKEGoSrBLytf5RD44"
```

### Sortable Identifiers

Rando can generate lexicographically sortable IDs.

```js
const rando = new Rando({ includeTimestamp: true, separator: '-' })
rando.generate() //=> "1nLnXM5B-VUQBxRu1W4Jw6nBkLzhhGp"

// "1nLnXM5B-VUQBxRu1W4Jw6nBkLzhhGp"
//  |------| |--------------------|
//  Sortable        Random
//  Segment         Segment
```

Sortable IDs can easily be decoded to return a date object. Note that the instance doing the decoding must have the same options set as the instance that did the generating.

```js
rando.getDate('1nLnXM5B-VUQBxRu1W4Jw6nBkLzhhGp') //=> 2024-09-11T17:51:46.274Z
```

### All Options

Rando instances can be extensively customized to generate the perfect identifier for your requirements. Here's the type definition of all available options, with details below:

```ts
type RandoOptions = {
  alphabet?: string
  randomAlphabet?: string
  randomLength?: number
  includeTimestamp?: boolean
  obfuscateTimestamp?: boolean
  timestampPosition?: 'start' | 'end'
  timestampAlphabet?: string
  timestampLength?: number
  prefix?: string
  separator?: string
  suffix?: string
}
```

`alphabet` _string_

A string of characters to use to generate your IDs. By default, the base 58 alphabet is used for a good balance of human-readability, URL safety, and entropy.

**`alphabet`** _string_

A string of characters to use to generate your IDs. By default, the base 58 alphabet is used for a good balance of human-readability, URL safety, and entropy.

| Property            | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alphabet`          | A string of characters to use to generate your IDs. By default, the base 58 alphabet is used for a good balance of human-readability, URL safety, and entropy.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `length`            | The output length of the random segment of the ID. By default, the `length` is `22` which provides 128 bits of entropy with a base 58 alphabet.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `sortable`          | Can be set to `prefix` or `suffix` which adds a sortable segment to the beginning or end of the id, respectively. The sortable segment uses millisecond precision.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `sortableSeparator` | Adds a string in between the sortable and random segments of the ID. By default, this is an empty string.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `sortableAlphabet`  | Allows you to specify a different alphabet for the sortable segment of the ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `sortableLength`    | Allows you to specify the length of the sortable segment of the ID. Rando uses practical default lengths that vary depending on the size of the alphabet. The defaults provide support for at least the year 2200 for any alphabet length from `2` to `128`. A longer sortable segment is needed with a 16-character `HEX` alphabet than with a `BASE_64` alphabet to represent the same date. If you increase the length beyond what is necessary, the sortable segment will be left-padded to allow you to represent dates further into the future. If you decrease the length below what is necessary, the instance will return an error. |

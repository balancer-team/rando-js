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

| Property             | Default   | Description                                                                                                                                                    |
| -------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alphabet`           | `BASE_58` | A string of characters to use to generate your IDs. By default, the base 58 alphabet is used for a good balance of human-readability, URL safety, and entropy. |
| `randomAlphabet`     | `BASE_58` | A string of characters to use to generate the random segment of your IDs. By default, the `alphabet` is used.                                                  |
| `randomLength`       | `22`      | The output length of the random segment of the ID. By default, the `length` is `22` which provides 128 bits of entropy with a base 58 alphabet.                |
| `includeTimestamp`   | `false`   | Adds a timestamp segment to the beginning or end of the id. By default, the timestamp segment is sortable and uses millisecond precision.                      |
| `obfuscateTimestamp` | `false`   | Obfuscates the timestamp by adding an offset to the characters in the timestamp segment.                                                                       |
| `timestampPosition`  | `start`   | Can be set to `start` or `end` which moves the timestamp segment to the beginning or end of the id, respectively.                                              |
| `timestampAlphabet`  | `BASE_58` | Allows you to specify a different alphabet for the timestamp segment of the ID.                                                                                |
| `timestampLength`    | `8`       | Allows you to specify the length of the timestamp segment of the ID (see below for additional details).                                                        |
| `prefix`             | `''`      | Adds a string to the beginning of the ID.                                                                                                                      |
| `separator`          | `''`      | Adds a string in between the timestamp and random segments of the ID.                                                                                          |
| `suffix`             | `''`      | Adds a string to the end of the ID.                                                                                                                            |

### Options Special Considerations

The `randomLength` and alphabet length together determine how many bits of entropy your ID will have. Using a tool such as a collision calculator, you can adjust these properties as needed to achieve your desired level of entropy.

When you use `includeTimestamp`, Rando checks all IDs generated within the same millisecond for uniqueness. This prevents generating duplicate IDs, and enables you to use extremely short random segments in your ID.

The `timestampLength` must be long enough to support at least the year 2200. The required minimum length varies depending on the size (or base) of the alphabet. For example, an alphabet size of 10 requires a `timestampLength` of 13, whereas an alphabet size of 64 only requires a `timestampLength` of 8.

You can easily get useful information about any configuration by calling `getInfo()` on your instance.

```js
const rando = new Rando({ includeTimestamp: true, separator: '-' })
rando.getInfo()

// Output:
//
// {
//   alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
//   randomAlphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
//   randomLength: 22,
//   includeTimestamp: true,
//   obfuscateTimestamp: false,
//   timestampPosition: 'start',
//   timestampAlphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
//   timestampLength: 8,
//   prefix: '',
//   separator: '-',
//   suffix: '',
// }
```

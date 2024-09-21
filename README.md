# Rando

Rando is a tool for generating identifiers. By default, `rando()` generates a cryptographically random, universally unique ID. Options can be modified to fit a wide variety of requirements.

### Install

```
npm i @balancer-team/rando
```

### Usage

Import the rando class and create an instance. The instance generates IDs with the `generate()` method. By default, IDs are 21 characters long, use a base 58 alphabet, and have 123 bits of entropy. The default settings provide a good balance of entropy, human-readability, and URL safety, while delivering a compact ID with an extra bit of entropy compared to a UUIDv4.

```js
import { Rando } from '@balancer-team/rando'

const rando = new Rando()
rando.generate() // => "ogm3Yzf4NSKJsDnL8ma8X"
```

### Customizing the Length

If you want a longer random string, for example if you want extra security for an API key, it's easy to modify the length. The example below generates a 44-character ID with 257 bits of entropy:

```js
const rando = new Rando({ randomLength: 44 })
rando.generate() //=> "NfHRpTLJkjXcKmprjcpQ4UgRfL4KKEGoSrBLytf5RD44"
```

### Including Timestamps

Rando can add a timestamp to the beginning or end of an ID. Adding a timestamp to the beginning makes the ID lexicographically sortable. Rando will validate the `timestampAlphabet` to ensure it contains unique characters, and that it is lexicographically sorted.

```js
const rando = new Rando({ includeTimestamp: true, separator: '-' })
rando.generate()

// Output:
//
// "1nN6oZkd-AnxQck8bPqUCzG6S3pEoS"
//  |------| |-------------------|
//  Sortable        Random
//  Segment         Segment
```

Sortable IDs can easily be decoded to return a date object. Note that the instance doing the decoding must have the same options set as the instance that did the generating.

```js
rando.getDate('1nN6oZkd-AnxQck8bPqUCzG6S3pEoS').toISOString() //=> 2024-09-21T17:38:44.418Z
```

You can conceal the timestamp by obfuscating it. This uses the random segment to calculate an offset to the timestamp segment. This may be useful in situations where you don't want to reveal a predictable order. Obfuscated timestamps can still be decoded for the correct date to handle things like expirations and other time-sensitive operations.

```js
const rando = new Rando({ includeTimestamp: true, obfuscateTimestamp: true })
rando.generate() //=> "VGraJhvDodC3w3LoUSeermwccizba"
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
| `randomLength`       | `21`      | The length of the random segment of the ID. By default, the `randomLength` is `21` which provides 123 bits of entropy with a base 58 alphabet.                 |
| `includeTimestamp`   | `false`   | Adds a timestamp segment to the beginning or end of the id. By default, the timestamp segment is sortable and uses millisecond precision.                      |
| `obfuscateTimestamp` | `false`   | Obfuscates the timestamp by adding an offset to the characters in the timestamp segment.                                                                       |
| `timestampPosition`  | `'start'` | Can be set to `start` or `end` which moves the timestamp segment to the beginning or end of the id, respectively.                                              |
| `timestampAlphabet`  | `BASE_58` | Allows you to specify a different alphabet for the timestamp segment of the ID.                                                                                |
| `timestampLength`    | `8`       | Allows you to specify the length of the timestamp segment of the ID (see below for additional details).                                                        |
| `prefix`             | `''`      | Adds a string to the beginning of the ID.                                                                                                                      |
| `separator`          | `''`      | Adds a string in between the timestamp and random segments of the ID.                                                                                          |
| `suffix`             | `''`      | Adds a string to the end of the ID.                                                                                                                            |

### Special Considerations for Options

The `randomLength` and alphabet length together determine how many bits of entropy your ID will have. Using a tool such as a collision calculator, you can adjust these properties as needed to achieve your desired level of entropy.

The `timestampLength` must be long enough to support at least the year 2200. The required minimum length varies depending on the size (or base) of the alphabet. For example, an alphabet size of 10 requires a `timestampLength` of 13, whereas an alphabet size of 64 only requires a `timestampLength` of 8.

You can easily get useful information about any configuration, such as the maximum date is supports, by calling `getInfo()` on your instance.

```js
const rando = new Rando({ includeTimestamp: true, separator: '-' })
rando.getInfo()

// Output:
//
// {
//   alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
//   randomAlphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
//   randomLength: 21,
//   randomBase: 58,
//   randomEntropy: 123,
//   includeTimestamp: false,
//   obfuscateTimestamp: false,
//   timestampPosition: 'start',
//   timestampAlphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
//   timestampLength: 8,
//   timestampBase: 58,
//   timestampMax: 6028-02-27T14:15:18.016Z,
//   separator: '',
//   totalLength: 29
// }
```

### Presets

Rando comes with a few presets to make it easy to generate IDs for common use cases.

```js
import { particle, tracker, locker, pinto, slug } from '@balancer-team/rando/presets'

particle.generate() //=> "1nMK3pu9oQ8ff2jVtn5PR"
tracker.generate() //=> "zmLUmEHtDn"
locker.generate() //=> "KExaEVwFiZ5XL7339yjauuW2VAD2BrzBP5BPT8GWXbtX"
pinto.generate() //=> "368230"
slug.generate() //=> "A7GYWRH1"
```

- `particle` generates a sortable ID with 76 bits of entropy, like a compact UUIDv7.
- `tracker` generates a short ID with a hidden timestamp. Not guaranteed unique.
- `locker` generates a long ID with 257 bits of entropy, suitable for API keys.
- `pinto` generates a 6-digit pin.
- `slug` generates a short, readable ID using a profanity-resistant alphabet. Not guaranteed unique.

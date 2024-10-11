# Rando

Rando is a tool for generating identifiers. By default, `rando()` generates a cryptographically random, universally unique ID. Options can be modified to fit a wide variety of requirements.

### Install

```
npm i @balancer-team/rando
```

### Usage

Import the rando class and create an instance. The instance generates IDs with the `generate()` method. By default, IDs are 22 characters long, use a base 58 alphabet, and have 128 bits of entropy. The default settings provide a good balance of entropy, human-readability, and URL safety.

```js
import { Rando } from '@balancer-team/rando'

const rando = new Rando()
rando.generate() // => "ogm3Yzf4NnSKJsDnL8ma8X"
```

### Customizing the Length

If you want a longer random string, for example if you want extra security for an API key, it's easy to modify the length. The example below generates a 44-character ID with over 256 bits of entropy:

```js
const rando = new Rando({ length: 44 })
rando.generate() //=> "NfHRpTLJkjXcKmprjcpQ4UgRfL4KKEGoSrBLytf5RD44"
```

### Sortable IDs

Rando can generate sortable IDs where the beginning of the ID is an encoded timestamp using the given `alphabet`. Rando will evaluate the `alphabet` length and automatically determine how many characters are required to encode a timestamp at millisecond precision. If the `length` isn't sufficient for millisecond precision, the precision will be reduced as needed.

```js
const rando = new Rando({ sortable: true })
rando.generate()

// Output:
//
// "1nN6oZkdAnxQck8bPqUCzG"
//  |------||------------|
//  Sortable    Random
//  Segment     Segment
```

Sortable IDs can easily be decoded to return a date object. Note that the instance doing the decoding must have the same options set as the instance that generated it.

```js
rando.getDate('1nN6oZkdAnxQck8bPqUCzG').toISOString() //=> 2024-09-21T17:38:44.418Z
```

### Signed IDs

You can add a signature to the end of an ID to verify its authenticity. This is useful for preventing tampering with the ID and stopping brute-force attempts at guessing IDs, since verification can be handled by your server instead of your database. The signature is generated using the HMAC algorithm with the SHA-256 hash function. The signature is encoded using the same alphabet as the random segment, and the length of the signature will vary depending on the base of the `alphabet`. Longer alphabets will result in shorter signatures.

```js
// Generate the ID and sign it
const rando = new Rando({ secret: 'secret' }) // Use a secure secret, of course
const id = rando.generate() //=> "2VRw9zT8EHVFdxnzSXremp"
const signed = rando.sign(id) //=> "2VRw9zT8EHVFdxnzSXrempDPvgBzGv9RiGbLnUnQ8X2qPGbuYUzH1exnSnfKFVWrXM"

// Verify the signature
const verified = rando.verify(signed) //=> "2VRw9zT8EHVFdxnzSXremp"

// Handling the result
if (verified) {
  console.log(verified) //=> "2VRw9zT8EHVFdxnzSXremp"
} else {
  console.log(verified) //=> null
}
```

The verify method will return the original ID if the signature is valid, or `null` if the signature is invalid.

### All Options

Rando instances can be extensively customized to generate the perfect identifier for your requirements. Here's the type definition of all available options, with details below:

```ts
type RandoOptions = {
  alphabet?: string
  length?: number
  sortable?: boolean
  supportDate?: Date
  secret?: string
}
```

| Property      | Default      | Description                                                                                                                                                                                                                     |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alphabet`    | `BASE_58`    | A string of characters to use to generate your IDs. By default, the base 58 alphabet is used for a good balance of human-readability, URL safety, and entropy.                                                                  |
| `length`      | `22`         | The length of the ID. By default, the `length` is `22` which provides 128 bits of entropy with a base 58 alphabet.                                                                                                              |
| `sortable`    | `false`      | Makes the ID sortable. With the default base 58 alphabet, the first 8 characters are used to encode a timestamp at millisecond precision.                                                                                       |
| `supportDate` | `3000-01-01` | Allows you to specify a target date for the sortable segment to support. See below for additional details.                                                                                                                      |
| `secret`      | `undefined`  | Provide a secret for the sign and verify methods. The `secret` property can be changed after the instance is created, allowing you to set secrets even on presets. A good signing secret should be at least 32 characters long. |

### Special Considerations for Sortable IDs

The `length` and base of the `alphabet` together determine how long the sortable segment must be to support millisecond precision. If the `length` isn't long enough to support millisecond precision, the timestamp precision will be reduced as needed. The `supportDate` property allows you to specify a target date for the sortable segment to support. The sortable segment will be left-padded to support the target date as needed.

Note that making an ID sortable will reduce the number of random characters in the ID. If you `console.log` the Rando instance, you will see several helpful properties that can help you determine whether or not the ID meets your requirements.

```js
const rando = new Rando({ sortable: true, secret: 'secret' })

//=> Output
// Rando {
//   alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
//   length: 22,
//   randomLength: 14,
//   base: 58,
//   randomBits: 82.01173393178601,
//   randomLimit: 4.875194084160305e+24,
//   sortable: true,
//   supportDate: 3000-01-01T05:00:00.000Z,
//   sortableLength: 8,
//   sortableLimit: 6028-02-27T14:15:18.016Z,
//   sortableTrim: 0,
//   sortableResolution: '1 millisecond',
//   sortableFullLength: 8,
//   signatureFullLength: 44,
//   secret: 'secret'
// }
```

### Presets

Rando comes with a few presets to make it easy to generate IDs for common use cases.

```js
import { rando, particle, locker, pinto, slug } from '@balancer-team/rando/presets'

rando.generate() //=> "ogm3Yzf4NnSKJsDnL8ma8X"
particle.generate() //=> "1nMK3pu9oQ8ff2jVutn5PR"
locker.generate() //=> "KExaEVwFiZ5XL7339yjauuW2VAD2BrzBP5BPT8GWXbtX"
pinto.generate() //=> "368230"
slug.generate() //=> "gD75nvxqV43y"
```

- `rando` Default settings with 128 bits of entropy, like a compact UUIDv4.
- `particle` Sortable ID with 82 bits of entropy, like a compact UUIDv7.
- `locker` Long string with over 256 bits of entropy, suitable for API keys.
- `pinto` Numerical 6-digit pin for email or phone verification.
- `slug` Short, no vowels, over 64 bits of entropy. Not guaranteed unique.

### Guidance for Sortable IDs

The following table is a guide for the length needed to support at least the year 3000 with a given alphabet base. The table assumes that the timestamp supports millisecond precision.

| Base | Length | Max Year |
| ---- | ------ | -------- |
| 2    | 45     | 3084     |
| 3    | 29     | 4144     |
| 4    | 23     | 4199     |
| 5    | 20     | 4992     |
| 6    | 18     | 5188     |
| 7    | 16     | 3023     |
| 8    | 15     | 3084     |
| 9    | 15     | 8494     |
| 10   | 14     | 5138     |
| 11   | 13     | 3063     |
| 12   | 13     | 5360     |
| 13   | 13     | 11567    |
| 14   | 12     | 3766     |
| 15   | 12     | 6081     |
| 16   | 12     | 10889    |
| 17   | 11     | 3056     |
| 18   | 11     | 4006     |
| 19   | 11     | 5661     |
| 20   | 11     | 8459     |
| 21   | 11     | 13069    |
| 22   | 11     | 20486    |
| 23   | 10     | 3282     |
| 24   | 10     | 3979     |
| 25   | 10     | 4992     |
| 26   | 10     | 6443     |
| 27   | 10     | 8494     |
| 28   | 10     | 11356    |
| 29   | 10     | 15301    |
| 30   | 10     | 20681    |
| 31   | 10     | 27942    |
| 32   | 9      | 3084     |
| 33   | 9      | 3440     |
| 34   | 9      | 3894     |
| 35   | 9      | 4467     |
| 36   | 9      | 5188     |
| 37   | 9      | 6088     |
| 38   | 9      | 7205     |
| 39   | 9      | 8584     |
| 40   | 9      | 10277    |
| 41   | 9      | 12344    |
| 42   | 9      | 14856    |
| 43   | 9      | 17896    |
| 44   | 9      | 21557    |
| 45   | 9      | 25948    |
| 46   | 9      | 31193    |
| 47   | 9      | 37433    |
| 48   | 9      | 44832    |
| 49   | 8      | 3023     |
| 50   | 8      | 3207     |
| 51   | 8      | 3420     |
| 52   | 8      | 3664     |
| 53   | 8      | 3942     |
| 54   | 8      | 4261     |
| 55   | 8      | 4623     |
| 56   | 8      | 5034     |
| 57   | 8      | 5501     |
| 58   | 8      | 6028     |
| 59   | 8      | 6622     |
| 60   | 8      | 7292     |
| 61   | 8      | 8044     |
| 62   | 8      | 8888     |
| 63   | 8      | 9833     |
| 64   | 8      | 10889    |

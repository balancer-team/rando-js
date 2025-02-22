# Rando

Rando is a library for generating identifiers. By default, `rando()` generates a random, universally unique ID. Options can be modified to fit a wide variety of requirements. In a node environment, randomness is provided by the `node:crypto` module. In a browser environment, randomness is provided by the Web Crypto API.

### Install

```
npm i @balancer-team/rando
```

### Usage

Import the rando class and create an instance. The instance generates IDs with the `generate()` method.

```js
import { Rando } from '@balancer-team/rando'

const rando = new Rando()
rando.generate() // => "TGJL3v9QgnYhmSjvEmnTyr"
```

### Customizing the Length

If you want a longer random string, for example if you want extra security for an API key, it's easy to modify the length. The example below generates a 44-character ID with over 256 bits of entropy:

```js
const rando = new Rando({ length: 44 })
rando.generate() //=> "rmjUb9k1MsEYQGPVoQiBvM9Hx69Hmr422aCPDBQvAjMR"
```

### Sortable IDs

Rando can generate sortable IDs where the beginning of the ID is an encoded timestamp using the given `alphabet`. Rando will evaluate the `alphabet` length and automatically determine how many characters are required to encode a timestamp at millisecond precision. The `length` must be sufficient for millisecond precision. Refer to the table below for guidance on the length needed to support a given year with a given alphabet base.

```js
const rando = new Rando({ sortable: true })
rando.generate()

// Output:
//
// "1niQ6EpTpywH3wBBZUeHSu"
//  |------||------------|
//  Sortable    Random
//  Segment     Segment
```

Sortable IDs can be decoded to return a date. Note that the instance doing the decoding must have the same options as the instance that generated it.

```js
rando.getDate('1niQ6EpTpywH3wBBZUeHSu').toISOString() //=> 2025-02-22T22:24:53.420Z
```

### All Options

Rando instances can be extensively customized to generate the perfect identifier for your requirements. Here's the type definition of all available options, with details below:

```ts
type RandoOptions = {
  alphabet?: string
  length?: number
  sortable?: boolean
  supportDate?: Date
}
```

| Property      | Default   | Description                                                                                                   |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| `alphabet`    | `BASE_58` | A string of characters to use to generate your IDs.                                                           |
| `length`      | `22`      | The length of the ID. By default, the `length` is `22` which provides over 128 bits of entropy.               |
| `sortable`    | `false`   | Makes the ID sortable when set to `true`. The leading characters encode a timestamp at millisecond precision. |
| `supportDate` | `'3000'`  | Allows you to specify a target date for the sortable segment. See below for additional details.               |

### Special Considerations for Sortable IDs

The `length` and base of the `alphabet` together determine how long the sortable segment must be for millisecond precision. If the `length` is too short, an error will be thrown on instantiation. The `supportDate` property allows you to specify a target date for the sortable segment to support. The sortable segment will be left-padded to support the target date as needed.

Note that making an ID sortable will reduce the number of random characters in the ID. If you `console.log` the instance, you will see several helpful properties that can help you determine whether or not the ID meets your requirements.

```js
const rando = new Rando({ sortable: true })

// Output:
//
// Rando {
//   alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
//   length: 22,
//   randomLength: 14,
//   base: 58,
//   randomBits: 82.01173393178601,
//   randomLimit: 4.875194084160305e+24,
//   sortable: true,
//   supportDate: 3000-01-01T00:00:00.000Z,
//   sortableLength: 8,
//   sortableLimit: 6028-02-27T14:15:18.016Z
// }
```

### Presets

Rando comes with a few presets to make it easy to generate IDs for common use cases.

```js
import { rando, sorto, locker, sesame, pinto } from '@balancer-team/rando/presets'

rando.generate() //=> "TGJL3v9QgnYhmSjvEmnTyr"
sorto.generate() //=> "1niQ6EpTpywH3wBBZUeHSu"
locker.generate() //=> "rmjUb9k1MsEYQGPVoQiBvM9Hx69Hmr422aCPDBQvAjMR"
sesame.generate() //=> "E@MvHJG4JbA$o{8ll0AK"
pinto.generate() //=> "368230"
```

- `rando` Default with over 128 bits of entropy, like a compact UUIDv4.
- `sorto` Sortable string followed by a random string, like a compact UUIDv7.
- `locker` Long string with over 256 bits of entropy, suitable for API keys.
- `sesame` Secure password with over 128 bits of entropy.
- `pinto` Numerical 6-digit pin for email or phone verification.

### Guidance for Sortable IDs

The following table is a guide for the length needed to support at least the year 3000 with a given alphabet base.

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

# Simple ID

Simple ID generates universally unique IDs that are URL safe and cryptographically random.

### Usage

```js
import { sid } from 'sid'

const id = sid() // => "bx5p9mnyk52t1gtq728a6se7b"
```

### Default Options

```js
const options = {
  length: 25, // 125 random bits with a base 32 alphabet
  alphabet: '123456789abcdefghjkmnpqrstuvwxyz', // Omits 0, o, i, l, u for readability
  prefix: '', // Optional prefix
}

const id = sid(options) // => "pwy1unk1763g9prgn1ug1e6ap"
```

### Example: 6-digit Pin

```js
const options = {
  length: 6, // Common length for a pin
  alphabet: '0123456789', // Common to use only numbers
}

const pin = sid(options) // => "383620"
```

### Example: Create an API Key with a Prefix

```js
const options = {
  length: 50, // 250 random bits with the default alphabet
  prefix: 'live_', // For example, to distinguish environments
}

const key = sid(options) // => "live_x47pb7gr4csnu9yarhsf5gb8xcs39dyrqsm2pyjkjbeafqb672"
```

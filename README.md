# Simple ID

Simple ID generates IDs that are URL safe, human readable, and cryptographically random. By default, Simple IDs are universally unique, providing more than 128 bits of randomness.

### Install

```
npm i @balancer-team/sid
```

### Usage

```js
import { sid } from '@balancer-team/sid'

const id = sid() // => "ogm3Yzf4NSKJsDnL8ma8XC"
```

### Default Options

```js
const defaultOptions = {
  length: 22, // Provides more than 128 bits of randomness
  alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz', // Base 58
  prefix: '', // Optional prefix
}

const id = sid(defaultOptions) // => "8fzKWQL1oD9cr6UgZ3gHBu"
```

### Example: 6-digit Pin

```js
const pinOptions = {
  length: 6, // Common length for a pin
  alphabet: '0123456789', // Common to use only numbers
}

const pin = sid(pinOptions) // => "383620"
```

### Example: API Key with a Prefix

```js
const keyOptions = {
  length: 44, // Provides more than 256 bits of randomness
  prefix: 'live_', // For example, to distinguish between environments
}

const key = sid(keyOptions) // => "live_NfHRpTLJkjXcKmprjcpQ4UgRfL4KKEGoSrBLytf5RD44"
```

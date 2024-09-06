# Simple ID

Simple ID generates IDs that are URL safe, human readable, and cryptographically random. By default, Simple IDs are universally unique, providing more than 128 bits of entropy with just 22 characters.

### Install

```
npm i @balancer-team/sid
```

### Usage

```js
import { sid } from '@balancer-team/sid'

const id = sid() // => "ogm3Yzf4NSKJsDnL8ma8Xn"
```

### Default Options

By default, Simple ID generates an ID that is universally unique with slighty more than 128 bits of entropy. If you don't want to change the defaults, you don't have to provide an options object.

```js
const defaultOptions = {
  length: 22, // 128 bits of entropy
  alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz', // Base 58
  prefix: '', // Optional prefix
}

const id = sid(defaultOptions) // => "8fzKWQL1oD9cr6UgZ3gHBu"
```

### Example: 6-digit Pin

The options object can be modified by providing one or more properties. For example, these options would generate a cryptographically random 6-digit pin.

```js
const pinOptions = {
  length: 6, // Common length for a pin
  alphabet: '0123456789', // Common to use only numbers
}

const pin = sid(pinOptions) // => "383620"
```

### Example: API Key with a Prefix

Sometimes it may be helpful to provide a prefix, for example if you want to generate API keys that distinguish between development and production environments. By defining the prefix in the options object, you can have a clean function that generates exactly the string you need.

```js
const keyOptions = {
  length: 44, // 256 bits of entropy
  prefix: 'live_', // For example, to distinguish between environments
}

const key = sid(keyOptions) // => "live_NfHRpTLJkjXcKmprjcpQ4UgRfL4KKEGoSrBLytf5RD44"
```

### Example: Short ID

Assuming you don't need a universally unique ID, and you just need a practical amount of entropy, it is common to use an ID with less than 128 bits of entropy. For example, 14 characters with Base 58 would provide 82 bits of entropy. At this length, you would need to generate 313 billion IDs in order to have a 1% probability of one collision.

```js
const shortId = {
  length: 14, // 82 bits of entropy
}

const key = sid(shortId) // => "8fzKWQL1oD9cr6"
```

### Why Base 58?

There are edge cases where it is helpful to have a human-readable ID. Base 58 excludes the characters "0", "O", "I", and "l", which are hard to distinguish with some fonts. Base 58 is used in Bitcoin, Solana and other projects to improve readability.

Base 58 also excludes special characters "-" and "\_", which can imply a meaningful segmentation of the ID where there is none. Dashes can also get in the way of quickly selecting an ID to copy and paste it.

If you prefer to use a different alphabet, such as base 64, base 32, or hex, you can easily set the `alphabet` property to whatever your project requires.

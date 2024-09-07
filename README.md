# Rando and Lex

Rando and Lex is a library for generating identifiers, with `rando()` generating random strings and `lex()` generating lexicographically sortable strings. The two generators can be customized and combined to create the perfect identifier for your project requirements.

### Install

```
npm i @balancer-team/rando-and-lex
```

### Basic Usage

```js
import { rando, lex } from '@balancer-team/rando-and-lex'

const someRando = rando() // => "ogm3Yzf4NSKJsDnL8ma8Xn"
const someLex = lex() // => "1nL9fdp3"
```

### Rando

The `rando()` function generates cryptographically random strings. By default, the strings are universally unique with 128 bits of entropy. If you don't want to change the defaults, you don't have to provide an options object, but it is provided below for the sake of illustration.

```js
const defaultRandoOptions = {
  length: 22, // 22 characters provides 128 bits of entropy, comparable to a UUID
  alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz', // Base 58
}

const id = rando(defaultRandoOptions) // => "8fzKWQL1oD9cr6UgZ3gHBu"
```

### Lex

The `lex()` function generates lexicographically sortable strings. By default, the strings are 8 characters long and can be generated until the year 6000. These settings provide for a reasonable number of leading characters with a base 58 alphabet. If you think you'll want your application to last beyond the year 6000, you can adjust the `year` property to suit your ambitions. The result will be more repeating leading characters to maintain lexicographic sortabilty.

```js
const defaultLexOptions = {
  date: new Date() // Current date by default
  alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz' // Base 58
  maxYear: 6000 // After the year 6000, these options won't work
}

const id = lex(defaultLexOptions) ///////////// INSERT
```

### Putting it All Together

Of course, `rando()` and `lex()` can be combined to create the perfect identifier. Here's an example that fits the `ulid` spec:

```js
const lexOptions = {
  alphabet: '0123456789ABCDEFGHJKMNPQRSTVWXYZ', // Crockford's base32
  maxYear: 10889, // ulid spec
}

const randoOptions = {
  length: 16, // 80 bits of entropy
  alphabet: '0123456789ABCDEFGHJKMNPQRSTVWXYZ', // Crockford's base32
}

const id = lex(lexOptions) + rando(randoOptions)
```

### More examples

The options object can be modified by providing one or more properties. For example, these options would generate a cryptographically random 6-digit pin.

```js
// Generate a 6-digit pin
const pinOptions = {
  length: 6, // Common length for a pin
  alphabet: '0123456789', // Common to use only numbers
}

const pin = rando(pinOptions) // => "383620"

// Generate an API key
const apiKeyOptions = {
  length: 44, // 256 bits of entropy
}

const key = 'live_' + rando(apiKeyOptions) // => "live_NfHRpTLJkjXcKmprjcpQ4UgRfL4KKEGoSrBLytf5RD44"

// Generate a short ID
const shortId = {
  length: 14, // 82 bits of entropy
}

const key = rando(shortId) // => "8fzKWQL1oD9cr6"

// Generate a Snowflake-like ID
const snowflakeLexOptions = {
  maxYear: 2080,
  alphabet: '0123456789', // Snowflake uses numbers only
}

const snowflakeRandoOptions = {
  length: 10,
  alphabet: '0123456789', // Snowflake uses numbers onle
}

const snowflakeLike = lex(snowflakeLexOptions) + rando(snowflakeRandoOptions)
```

### Why Base 58 by Default?

There are edge cases where it is helpful to have a human-readable ID. Base 58 excludes the characters "0", "O", "I", and "l", which are hard to tell apart with certain fonts. Base 58 is used in Bitcoin, Solana and other projects for this reason.

Base 58 also excludes special characters "-" and "\_", which can imply a meaningful segmentation of the ID where there is none. Dashes can also get in the way of quickly selecting an ID to copy and paste it.

If you prefer to use a different alphabet, such as base 64, Crockford's 32, or hex, you can easily set the `alphabet` property to whatever your project requires.

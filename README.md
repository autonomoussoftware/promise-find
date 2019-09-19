# promise-find

[![Build Status](https://travis-ci.com/autonomoussoftware/promise-find.svg?branch=master)](https://travis-ci.com/autonomoussoftware/promise-find)
[![Code Style](https://img.shields.io/badge/code%20style-bloq-0063a6.svg)](https://github.com/bloq/eslint-config-bloq)
[![Known Vulnerabilities](https://snyk.io/test/github/autonomoussoftware/promise-find/badge.svg?targetFile=package.json)](https://snyk.io/test/github/autonomoussoftware/promise-find?targetFile=package.json)

Find the promise call that satisfies the testing function.

## Installation

```shell
npm install promise-find
```

## Usage

```js
const promiseFind = require('promise-find')

promiseFind([
  () => Promise.resolve(null),
  () => Promise.resolve('match'),
  () => Promise.reject(new Error('never called')),
  () => Promise.resolve('never called either')
]).then(function(result) {
  console.log(result) // prints 'match'
})
```

## API

### `promiseFind(list, test)`

Returns a `Promise` that will resolve to the result of the first function call
that passes the test or `null` if no one passes the test.
If any function fails, the promise will be a rejected the error.

#### `list`

An array of functions that receive no arguments and return either a value or a
promis.

#### `test`

The function used to check for a match.
It defaults to the "identity" function so any truthy value will pass.

## License

MIT

'use strict'

// Identity function
const identity = value => value

/**
 * Given a list of functions, call each one in order and testing the result.
 * Then return the first value that passes the test or `null`. The test defaults
 * to the identity function so it will test for truthy values. If any function
 * fails, the result will be a rejected promise with the error.
 *
 * @param {(() => any)[]} list A list of fns to call.
 * @param {(result: any) => boolean} [test] The fn to check for a match.
 * @returns {Promise<any>} The first matching value found.
 */
function promiseFind(list, test = identity) {
  return list.reduce(function(resultPromise, fn) {
    return resultPromise.then(function(result) {
      return test(result) ? result : Promise.resolve(fn())
    })
  }, Promise.resolve(null))
}

module.exports = promiseFind

'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised).should()

const expect = chai.expect

const find = require('..')

describe('promise-find', function () {
  it('should return null for empty arrays', function () {
    return find([]).then(function (result) {
      expect(result).to.be.null
    })
  })

  it('should find the first result', function () {
    return find([() => 'match']).then(function (result) {
      result.should.equal('match')
    })
  })

  it('should find the second result', function () {
    return find([() => null, () => 'match']).then(function (result) {
      result.should.equal('match')
    })
  })

  it('should not execute the second result', function () {
    return find([
      () => 'match',
      () => Promise.reject(new Error('not called'))
    ]).then(function (result) {
      result.should.equal('match')
    })
  })

  it('should reject if a call fails', function () {
    return find([
      () => Promise.reject(new Error('called'))
    ]).should.rejectedWith('called')
  })

  it('should support promise-returning calls', function () {
    return find([() => Promise.resolve('match')]).then(function (result) {
      result.should.equal('match')
    })
  })
})

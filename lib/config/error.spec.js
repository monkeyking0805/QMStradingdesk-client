'use strict'

/* global describe it */
const chai = require('chai')
const expect = chai.expect

const error = require('./error')

describe('error module', () => {
  it('should expose an error object', () => {
    expect(error).to.be.a('object')
  })

  describe('"error"', () => {
    it('should return errors for specific scenarios', () => {
      expect(error.unknown).to.be.a('string')
    })
  })
})

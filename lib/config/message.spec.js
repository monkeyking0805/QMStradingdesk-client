/* global describe it */

const chai = require('chai')
const expect = chai.expect
const message = require('./message')

describe('Environment:config:message', () => {
  it('should expose an message object', () => {
    expect(message).to.be.a('object')
    expect(message).to.have.key('errorMessage')
  })

  describe('"Message"', () => {
    it('Error message should have invalid request message', () => {
      expect(message.errorMessage).to.have.key('invalidRequest')
    })
  })
})

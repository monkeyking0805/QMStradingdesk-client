/* global describe it */
const chai = require('chai')
const expect = chai.expect
const environment = require('./message')

describe('Config:message', () => {
  it('Should expose an message object', () => {
    expect(environment).to.be.a('object')
  })

  it('Should have MESSAGE_NOTIFICATION', () => {
    expect(environment).to.have.key('MESSAGE_NOTIFICATION')
  })
})

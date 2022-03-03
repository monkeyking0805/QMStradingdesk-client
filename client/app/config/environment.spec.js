'use strict'

/* global describe it */
const chai = require('chai')
const expect = chai.expect
const environment = require('./environment')

describe('Config:environment', () => {
  it('Should expose an environment object', () => {
    expect(environment).to.be.a('object')
  })

  it('Should have CLIENT_URI', () => {
    expect(environment.CLIENT_URI).to.not.equal(null)
  })

  it('Should have LOG_ROCKET', () => {
    expect(environment.LOG_ROCKET).to.not.equal(null)
  })
})

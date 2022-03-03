'use strict'

/* global describe it */
const chai = require('chai')
const expect = chai.expect
const fixtures = require('../../test/fixtures').environment
const environment = require('./environment')
require('dotenv').config()

describe('Environment:config:environment', () => {
  it('Should expose an environment object', () => {
    expect(environment).to.be.a('object')
  })

  describe('"Environment"', () => {
    it('Should set default nodeEnv if not provided', () => {
      expect(environment.nodeEnv).to.be.eq(fixtures.nodeEnv)
    })

    it('Should set default port if not provided', () => {
      expect(parseInt(environment.port)).to.be.eq(parseInt(fixtures.port))
    })

    it('Should set default facadeUri if not provided', () => {
      expect(environment.facadeUri).to.be.eq(fixtures.facadeUri)
    })

    it('Should set default jwtSecretkey if not provided', () => {
      expect(environment.jwtSecretKey).to.be.eq(process.env.JWT_SECRET_KEY)
    })
  })
})

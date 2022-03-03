'use strict'

/* global describe it before after afterEach */
require('dotenv').config({ path: '.env.test' })
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const request = require('supertest')
const mockery = require('mockery')
const rewire = require('rewire')
const fixtures = require('../../fixtures')
const spies = new Map()
let app, server

before((done) => {
  mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false
  })
  spies.set('debug', sinon.spy())
  mockery.registerMock('debug', () => spies.get('debug'))
  app = rewire('../../../lib/app')
  server = rewire('../../../lib/app')()
  done()
})

after(() => {
  mockery.disable()
})

afterEach(() => {
  server.close()
})

describe('Main App', () => {
  it('should handle error on throw', () => {
    const error = fixtures.error.generic
    server.emit('error', error)
    expect(spies.get('debug')).to.have.been.calledWith(error.message)
  })

  describe('"_handleErr"', () => {
    it('should debug an error message to stdout', () => {
      const error = fixtures.error.generic
      app.__get__('_handleErr')(error)
      expect(spies.get('debug')).to.have.been.calledWith(error.message)
    })
  })

  describe('Route Test', () => {
    it('Should return 200 and HTML content', async () => {
      await request(server)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
    })
  })
})

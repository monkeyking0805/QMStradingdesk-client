/* global describe it before */
const chai = require('chai')
const sinonChai = require('sinon-chai')
const request = require('supertest')
const mockery = require('mockery')
const rewire = require('rewire')
const fixtures = require('../../../fixtures')
const nock = require('nock')
chai.use(sinonChai)
let server

before((done) => {
  mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false
  })
  server = rewire('../../../../lib/app')()
  done()
})

describe('Flag:api/flag', () => {
  // Will update this test while server api is more stable
})

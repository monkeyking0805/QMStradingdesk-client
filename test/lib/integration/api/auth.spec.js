/* global describe it before */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const request = require('supertest')
const mockery = require('mockery')
const rewire = require('rewire')
const nock = require('nock')
const fixtures = require('../../../fixtures')
const expect = chai.expect
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

describe('API', () => {
  describe('Auth:Login - api/login', () => {
    it('Should return credential if login successful', async () => {
      // Because this need to be call with another client
      // This test will not complete until got statble API to write expect value
      const { mockHTTP, environment, mockRequest, mockResponse } = fixtures
      // Mock Facade
      nock(`${environment.facadeUri}`)
        .defaultReplyHeaders(mockHTTP.mockReplyHeader)
        .get('login')
        .reply(200, mockResponse.loginSuccessResponse)

      await request(server)
        .post(mockHTTP.mockURI.auth.login)
        .send(mockRequest.validLogin)
    })

    it('Should return bad request if not provide correct request', async () => {
      await request(server)
        .post(fixtures.mockHTTP.mockURI.auth.login)
        .send(fixtures.mockRequest.invalidLogin)
        .expect(400)
    })
  })
})

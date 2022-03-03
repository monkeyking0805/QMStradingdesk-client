/* global describe it */
const chai = require('chai')
const nock = require('nock')
const chaiAsPromise = require('chai-as-promised')
const expect = chai.expect
const userAuth = require('./userAuth')
const fixtures = require('../../../../test/fixtures')
chai.use(chaiAsPromise)

describe('UNIT_TEST:controllers:api.auth.userAuth', () => {
  it('Should send request to login facade', async () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    nock(`${environment.facadeUri}`)
      .defaultReplyHeaders(mockHTTP.mockReplyHeader)
      .get(mockHTTP.mockURI.auth.login)
      .reply(200, mockResponse.loginSuccessResponse)
    const { ctx } = fixtures.koa
    // VALID INPUT
    ctx.request.body = fixtures.mockRequest.validLogin
    await userAuth.login(ctx, undefined)
    expect(ctx).to.have.any.keys('body')
    expect(ctx).to.have.any.keys('status')
    expect(ctx.body).not.to.be.equal(undefined)
    expect(ctx.status).not.to.be.equal(undefined)
  })

  it('Should return throw error if invalid input', () => {
    const { ctx } = fixtures.koa
    // INVALID INPUT
    ctx.request.body = fixtures.mockRequest.invalidLogin
    return expect(userAuth.login(ctx, undefined)).to.eventually.be.rejectedWith(Error)
  })
})

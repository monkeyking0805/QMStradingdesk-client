/* global describe it */
const chai = require('chai')
const nock = require('nock')
const chaiAsPromise = require('chai-as-promised')
const expect = chai.expect
const flagController = require('./flagController')
const fixtures = require('../../../../test/fixtures')
chai.use(chaiAsPromise)

describe('UNIT_TEST:controllers:api.flagController:flagController', () => {
  it('Should send request to languages facade', async () => {
    const { environment, mockHTTP, mockResponse, koa: { ctx } } = fixtures
    generateMockHttp(environment, mockHTTP, mockHTTP.mockURI.flag.languages, mockResponse.flags.languages)
    await flagController.fetchFlagLanguages(ctx, undefined)
    expectFlagController(ctx)
  })

  it('Should send request to countries facade', async () => {
    const { environment, mockHTTP, mockResponse, koa: { ctx } } = fixtures
    generateMockHttp(environment, mockHTTP, mockHTTP.mockURI.flag.countries, mockResponse.flags.countries)
    await flagController.fetchFlagCountries(ctx, undefined)
    expectFlagController(ctx)
  })

  it('Should send request to regions facade', async () => {
    const { environment, mockHTTP, mockResponse, koa: { ctx } } = fixtures
    generateMockHttp(environment, mockHTTP, mockHTTP.mockURI.flag.regions, mockResponse.flags.regions)
    await flagController.fetchFlagRegions(ctx, undefined)
    expectFlagController(ctx)
  })

  it('Should send request to timezones facade', async () => {
    const { environment, mockHTTP, mockResponse, koa: { ctx } } = fixtures
    generateMockHttp(environment, mockHTTP, mockHTTP.mockURI.flag.timezones, mockResponse.flags.timezones)
    await flagController.fetchFlagTimezones(ctx, undefined)
    expectFlagController(ctx)
  })

  it('Should send request to roles facade', async () => {
    const { environment, mockHTTP, mockResponse, koa: { ctx } } = fixtures
    generateMockHttp(environment, mockHTTP, mockHTTP.mockURI.flag.roles, mockResponse.flags.roles)
    await flagController.fetchFlagRoles(ctx, undefined)
    expectFlagController(ctx)
  })
})

const expectFlagController = (source, target) => {
  expect(source).to.have.any.keys('body')
  expect(source).to.have.any.keys('status')
  expect(source.body).not.to.be.equal(undefined)
  expect(source.status).not.to.be.equal(undefined)
}

const generateMockHttp = (environment, mockHTTP, mockURL, mockResponse) => {
  nock(`${environment.facadeUri}`)
    .defaultReplyHeaders(mockHTTP.mockReplyHeader)
    .get(mockURL)
    .reply(200, mockResponse)
}

/* global describe it */
const chai = require('chai')
const expect = chai.expect
const requestFacde = require('./requestFacade')
const fixtures = require('../../test/fixtures')
const nock = require('nock')

describe('UNIT_TEST:module.requestFacade', () => {
  it('Should send request to input url', async () => {
    nock(`${fixtures.environment.facadeUri}`)
      .get('/test')
      .reply(200, fixtures.mockResponse.dummyResponse)
    const result = await requestFacde.request(
      fixtures.koa.ctx,
      'get',
      `${fixtures.environment.facadeUri}/test`,
      {}
    )
    expect(result).to.have.any.keys('body')
    expect(result).to.have.any.keys('header')
    expect(result).to.have.any.keys('status')
    expect(result.status).to.equal(200)
  })

  it('Should return 500 when invalid route', async () => {
    const result = await requestFacde.request(
      fixtures.koa.ctx,
      'get',
      'invalid route',
      {}
    )
    expect(result).to.have.any.keys('body')
    expect(result).to.have.any.keys('status')
    expect(result.status).to.equal(500)
  })
})

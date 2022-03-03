/* global describe it */
const chai = require('chai')
const chaiAsPromise = require('chai-as-promised')
const assetController = require('./assetController')
const fixtures = require('../../../../test/fixtures')
chai.use(chaiAsPromise)
const expect = chai.expect

describe('UNIT_TEST:controller:api.assetController:assetController', () => {
  it('Should send get request to sport code facade', async () => {
    const { ctx } = fixtures.koa
    await assetController.fetchSportCodes(ctx, undefined)
    expectAssetController(ctx, undefined)
  })

  it('Should send get request to brand category facade', async () => {
    const { ctx } = fixtures.koa
    await assetController.fetchBrandCategories(ctx, undefined)
    expectAssetController(ctx, undefined)
  })
})

const expectAssetController = (source, target) => {
  expect(source).to.have.any.keys('body')
  expect(source).to.have.any.keys('status')
  expect(source.body).not.to.be.equal(undefined)
  expect(source.status).not.to.be.equal(undefined)
}

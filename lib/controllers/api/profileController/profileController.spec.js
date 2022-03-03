/* global describe it */
const chai = require('chai')
const chaiAsPromise = require('chai-as-promised')
const profileController = require('./profileController')
const fixtures = require('../../../../test/fixtures')
chai.use(chaiAsPromise)
const expect = chai.expect

describe('UNIT_TEST:controller:api.profileController:profileController', () => {
  it('Should send get request to profile facade', async () => {
    const { ctx } = fixtures.koa
    await profileController.fetchProfileDetail(ctx, undefined)
    expectUserController(ctx, undefined)
  })

  it('Should send put request to profile facade', async () => {
    const { ctx } = fixtures.koa
    ctx.request.body = fixtures.mockRequest.profile.updateProfileRequest
    await profileController.updateProfileDetail(ctx, undefined)
    expectUserController(ctx, undefined)
  })

  it('Should send put to reset profile password', async () => {
    const { ctx } = fixtures.koa
    ctx.request.body = fixtures.mockRequest.profile.validResetPassword
    await profileController.resetProfilePassword(ctx, undefined)
    expectUserController(ctx, undefined)
  })

  it('Should return throw error if invalid reset profile password request', async () => {
    const { ctx } = fixtures.koa
    ctx.request.body = fixtures.mockRequest.profile.invalidResetPassword
    await expect(profileController.resetProfilePassword(ctx, undefined)).to.be.rejectedWith(Error)
  })

  it('Should send post request to request reset profile email facade', async () => {
    const { ctx } = fixtures.koa
    ctx.params = fixtures.mockRequest.profile.validResetEmail
    await profileController.resetProfileEmail(ctx, undefined)
    expectUserController(ctx, undefined)
  })

  it('Should return throw error if invalid request reset profile email request', async () => {
    const { ctx } = fixtures.koa
    ctx.params = fixtures.mockRequest.profile.invalidResetEmail
    await expect(profileController.resetProfileEmail(ctx, undefined)).to.be.rejectedWith(Error)
  })

  it('Should send get request to reset profile email', async () => {
    const { ctx } = fixtures.koa
    ctx.request.body = fixtures.mockRequest.profile.validRequestResetEmail
    await profileController.requestResetProfileEmail(ctx, undefined)
    expectUserController(ctx, undefined)
  })

  it('Should return throw error if invalid reset email request', async () => {
    const { ctx } = fixtures.koa
    ctx.request.body = fixtures.mockRequest.profile.invalidRequestResetEmail
    await expect(profileController.requestResetProfileEmail(ctx, undefined)).to.be.rejectedWith(Error)
  })
})

const expectUserController = (source, target) => {
  expect(source).to.have.any.keys('body')
  expect(source).to.have.any.keys('status')
  expect(source.body).not.to.be.equal(undefined)
  expect(source.status).not.to.be.equal(undefined)
}

/* global describe it */
const chai = require('chai')
const chaiAsPromise = require('chai-as-promised')
const userController = require('./userController')
const fixtures = require('../../../../test/fixtures')
chai.use(chaiAsPromise)
const expect = chai.expect

describe('UNIT_TEST:controllers:api.userController:userController', () => {
  it('Should send post request to users facade', async () => {
    const { ctx } = fixtures.koa
    ctx.request.body = fixtures.mockRequest.user.createUser
    await userController.createUser(ctx, undefined)
    expectUserController(ctx, undefined)
  })

  it('Should return throw error if invalid user request input', async () => {
    const { ctx } = fixtures.koa
    ctx.request.body = fixtures.mockRequest.user.invalidCreateUser
    await expect(userController.createUser(ctx, undefined)).to.be.rejectedWith(Error)
  })

  it('Should not allow empty string for create user', async () => {
    const { ctx } = fixtures.koa
    ctx.request.body = fixtures.mockRequest.user.invalidCreateUser
    await expect(userController.createUser(ctx, undefined)).to.be.rejectedWith(Error)
  })

  it('Should send get request to user list facade', async () => {
    const { ctx } = fixtures.koa
    await userController.fetchUser(ctx, undefined)
    expectUserController(ctx, undefined)
  })
})

const expectUserController = (source, target) => {
  expect(source).to.have.any.keys('body')
  expect(source).to.have.any.keys('status')
  expect(source.body).not.to.be.equal(undefined)
  expect(source.status).not.to.be.equal(undefined)
}

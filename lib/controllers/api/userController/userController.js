const debug = require('debug')('qms-tradingdesk-client:api:userController')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { errorMessage } = require('../../../config/message')
const { transformRequestQuery } = require('../../../helpers/util')

const createUser = async (ctx, next) => {
  debug(createUser.name)
  const { body: requestBody } = ctx.request
  if (
    (!requestBody.hasOwnProperty('email') || requestBody.email === '') ||
    (!requestBody.hasOwnProperty('password') || requestBody.password === '') ||
    (!requestBody.hasOwnProperty('firstname') || requestBody.firstname === '') ||
    (!requestBody.hasOwnProperty('language') || requestBody.language === '')
  ) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }

  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/users`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchUser = async (ctx, next) => {
  debug(fetchUser.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/users${transformRequestQuery(ctx.query)}`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchIndividualUser = async (ctx, next) => {
  debug(fetchIndividualUser.name)
  if (!ctx.params.hasOwnProperty('userID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }

  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/users/${ctx.params.userID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const updateIndividualUser = async (ctx, next) => {
  debug(updateIndividualUser.name)
  if (!ctx.params.hasOwnProperty('userID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/admin/users/${ctx.params.userID}`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const deleteIndividualUser = async (ctx, next) => {
  debug(deleteIndividualUser.name)
  if (!ctx.params.hasOwnProperty('userID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }

  const result = await facadeRequest.request(ctx, 'delete', `${facadeUri}/admin/users/${ctx.params.userID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const requestResetPassword = async (ctx, next) => {
  debug(requestResetPassword.name)
  const { body: requestBody } = ctx.request
  if (!requestBody.hasOwnProperty('email')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/resetpassword`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const resetPassword = async (ctx, next) => {
  debug(resetPassword.name)
  const { body: requestBody } = ctx.request
  if (
    !requestBody.hasOwnProperty('token') ||
    !requestBody.hasOwnProperty('password')
  ) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/resetpassword/${requestBody.token}`, { password: requestBody.password })
  ctx.status = result.status
  ctx.body = result.body
}

const updatePassword = async (ctx, next) => {
  debug(updatePassword.name)
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/admin/users/${ctx.params.userID}/password`, {
    newpassword: requestBody.newPassword
  })
  ctx.status = result.status
  ctx.body = result.body
}

const validateResetPasswordToken = async (ctx, next) => {
  debug(validateResetPasswordToken.name)
  if (!ctx.params.hasOwnProperty('resetToken')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }

  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/resetpassword/${ctx.params.resetToken}`)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  createUser,
  fetchUser,
  fetchIndividualUser,
  updateIndividualUser,
  deleteIndividualUser,
  requestResetPassword,
  resetPassword,
  updatePassword,
  validateResetPasswordToken
}

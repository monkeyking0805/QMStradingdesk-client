const debug = require('debug')('qms-tradingdesk-client:api:profileController:profileController')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { errorMessage } = require('../../../config/message')

const fetchProfileDetail = async (ctx, next) => {
  debug(fetchProfileDetail.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/user/profile`)
  ctx.status = result.status
  ctx.body = result.body
}

const updateProfileDetail = async (ctx, next) => {
  debug(updateProfileDetail.name)
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/user/profile`, ctx.request.body)
  ctx.status = result.status
  ctx.body = result.body
}

const resetProfilePassword = async (ctx, next) => {
  debug(resetProfilePassword.name)
  if (!ctx.request.body.hasOwnProperty('currentPassword') || !ctx.request.body.hasOwnProperty('newPassword')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const requestUpdate = {
    password: ctx.request.body.currentPassword,
    newpassword: ctx.request.body.newPassword
  }
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/user/profile/password`, requestUpdate)
  ctx.status = result.status
  ctx.body = result.body
}

const requestResetProfileEmail = async (ctx, next) => {
  debug(requestResetProfileEmail.name)
  if (!ctx.request.body.hasOwnProperty('email')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/user/profile/resetemail`, ctx.request.body)
  ctx.status = result.status
  ctx.body = result.body
}

const resetProfileEmail = async (ctx, next) => {
  debug(resetProfileEmail.name)
  const { resetToken } = ctx.params
  if (!resetToken) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/user/profile/resetemail/${ctx.params.resetToken}`)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  fetchProfileDetail,
  updateProfileDetail,
  requestResetProfileEmail,
  resetProfileEmail,
  resetProfilePassword
}

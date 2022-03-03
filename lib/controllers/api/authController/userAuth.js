const debug = require('debug')('qms-tradingdesk-client:api:userAuth:userAuth')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { errorMessage } = require('../../../config/message')

const login = async (ctx, next) => {
  debug(login.name)

  if (!ctx.request.body.hasOwnProperty('email') || !ctx.request.body.hasOwnProperty('password')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }

  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/login`, ctx.request.body)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  login
}

const debug = require('debug')('qms-tradingdesk-client:api:codeController')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { transformRequestQuery } = require('../../../helpers/util')
const { errorMessage } = require('../../../config/message')

const fetchCodes = async (ctx, name) => {
  debug(fetchCodes.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/codes${transformRequestQuery(ctx.query)}`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchIndividualCode = async (ctx, next) => {
  debug(fetchIndividualCode.name)
  if (!ctx.params.hasOwnProperty('codeID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { codeID } = ctx.params
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/codes/${codeID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const createCode = async (ctx, name) => {
  debug(createCode.name)
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/codes`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const updateCode = async (ctx, next) => {
  debug(updateCode.name)
  const requestUpdate = ctx.request.body
  if (!ctx.params.hasOwnProperty('codeID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { codeID } = ctx.params
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/admin/codes/${codeID}`, requestUpdate)
  ctx.status = result.status
  ctx.body = result.body
}

const deleteCode = async (ctx, next) => {
  debug(deleteCode.name)
  if (!ctx.params.hasOwnProperty('codeID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { codeID } = ctx.params
  const result = await facadeRequest.request(ctx, 'delete', `${facadeUri}/admin/codes/${codeID}`)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  fetchCodes,
  fetchIndividualCode,
  createCode,
  updateCode,
  deleteCode
}

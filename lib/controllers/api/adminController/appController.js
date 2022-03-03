const debug = require('debug')('qms-tradingdesk-client:api:appController')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { transformRequestQuery } = require('../../../helpers/util')
const { errorMessage } = require('../../../config/message')

const fetchApps = async (ctx, name) => {
  debug(fetchApps.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/apps${transformRequestQuery(ctx.query)}`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchIndividualApp = async (ctx, next) => {
  debug(fetchIndividualApp.name)
  if (!ctx.params.hasOwnProperty('appID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { appID } = ctx.params
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/apps/${appID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const createApp = async (ctx, name) => {
  debug(createApp.name)
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/apps`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const updateApp = async (ctx, next) => {
  debug(updateApp.name)
  const requestUpdate = ctx.request.body
  if (!ctx.params.hasOwnProperty('appID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { appID } = ctx.params
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/admin/apps/${appID}`, requestUpdate)
  ctx.status = result.status
  ctx.body = result.body
}

const deleteApp = async (ctx, next) => {
  debug(deleteApp.name)
  if (!ctx.params.hasOwnProperty('appID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { appID } = ctx.params
  const result = await facadeRequest.request(ctx, 'delete', `${facadeUri}/admin/apps/${appID}`)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  fetchApps,
  fetchIndividualApp,
  createApp,
  updateApp,
  deleteApp
}

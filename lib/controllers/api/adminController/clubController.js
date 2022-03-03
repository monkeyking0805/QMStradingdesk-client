const debug = require('debug')('qms-tradingdesk-client:api:clubController')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { transformRequestQuery } = require('../../../helpers/util')
const { errorMessage } = require('../../../config/message')

const fetchClubs = async (ctx, name) => {
  debug(fetchClubs.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/clubs${transformRequestQuery(ctx.query)}`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchIndividualClub = async (ctx, next) => {
  debug(fetchIndividualClub.name)
  if (!ctx.params.hasOwnProperty('clubID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { clubID } = ctx.params
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/clubs/${clubID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const createClub = async (ctx, name) => {
  debug(createClub.name)
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/clubs`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const updateClub = async (ctx, next) => {
  debug(updateClub.name)
  const requestUpdate = ctx.request.body
  if (!ctx.params.hasOwnProperty('clubID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { clubID } = ctx.params
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/admin/clubs/${clubID}`, requestUpdate)
  ctx.status = result.status
  ctx.body = result.body
}

const deleteClub = async (ctx, next) => {
  debug(deleteClub.name)
  if (!ctx.params.hasOwnProperty('clubID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { clubID } = ctx.params
  const result = await facadeRequest.request(ctx, 'delete', `${facadeUri}/admin/clubs/${clubID}`)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  fetchClubs,
  fetchIndividualClub,
  createClub,
  updateClub,
  deleteClub
}

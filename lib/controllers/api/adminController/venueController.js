const debug = require('debug')('qms-tradingdesk-client:api:venueController')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { transformRequestQuery } = require('../../../helpers/util')
const { errorMessage } = require('../../../config/message')

const fetchVenues = async (ctx, name) => {
  debug(fetchVenues.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/venues${transformRequestQuery(ctx.query)}`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchIndividualVenue = async (ctx, next) => {
  debug(fetchIndividualVenue.name)
  if (!ctx.params.hasOwnProperty('venueID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { venueID } = ctx.params
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/venues/${venueID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const createVenue = async (ctx, name) => {
  debug(createVenue.name)
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/venues`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const updateVenue = async (ctx, next) => {
  debug(updateVenue.name)
  const requestUpdate = ctx.request.body
  if (!ctx.params.hasOwnProperty('venueID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { venueID } = ctx.params
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/admin/venues/${venueID}`, requestUpdate)
  ctx.status = result.status
  ctx.body = result.body
}

const deleteVenue = async (ctx, next) => {
  debug(deleteVenue.name)
  if (!ctx.params.hasOwnProperty('venueID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { venueID } = ctx.params
  const result = await facadeRequest.request(ctx, 'delete', `${facadeUri}/admin/venues/${venueID}`)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  fetchVenues,
  fetchIndividualVenue,
  createVenue,
  updateVenue,
  deleteVenue
}

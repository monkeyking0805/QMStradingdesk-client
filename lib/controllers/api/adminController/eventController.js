const debug = require('debug')('qms-tradingdesk-client:api:eventController')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { transformRequestQuery, transformRequestDropdownArray } = require('../../../helpers/util')
const { errorMessage } = require('../../../config/message')

const fetchEvents = async (ctx, name) => {
  debug(fetchEvents.name)
  const { body: requestBody } = ctx.request
  const serverRequest = {
    codes: transformRequestDropdownArray(requestBody.codes),
    clubs: transformRequestDropdownArray(requestBody.clubs),
    regions: transformRequestDropdownArray(requestBody.regions),
    venues: transformRequestDropdownArray(requestBody.venues),
    startDate: requestBody.startDate,
    endDate: requestBody.endDate,
    name: (requestBody.name) || '',
    archive: requestBody.archive
  }
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/events${transformRequestQuery(ctx.query)}`, serverRequest)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchIndividualEvent = async (ctx, next) => {
  debug(fetchIndividualEvent.name)
  if (!ctx.params.hasOwnProperty('eventID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { eventID } = ctx.params
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/events/${eventID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const createEvent = async (ctx, name) => {
  debug(createEvent.name)
  const { body: requestBody } = ctx.request
  const serverRequest = eventTransformRequest(requestBody)
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/events/create`, {
    ...serverRequest,
    startDate: serverRequest.startDate.value,
    endDate: serverRequest.endDate.value
  })
  ctx.status = result.status
  ctx.body = result.body
}

const updateEvent = async (ctx, next) => {
  debug(updateEvent.name)
  const requestUpdate = ctx.request.body
  if (!ctx.params.hasOwnProperty('eventID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { eventID } = ctx.params
  const serverRequest = eventTransformRequest(requestUpdate)
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/admin/events/${eventID}`, serverRequest)
  ctx.status = result.status
  ctx.body = result.body
}

const deleteEvent = async (ctx, next) => {
  debug(deleteEvent.name)
  if (!ctx.params.hasOwnProperty('eventID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { eventID } = ctx.params
  const result = await facadeRequest.request(ctx, 'delete', `${facadeUri}/admin/events/${eventID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const archiveEvent = async (ctx, next) => {
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/events/archive`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const restoreEvent = async (ctx, next) => {
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/events/restore`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const validateImport = async (ctx, next) => {
  debug(validateImport.name)
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/events/validateimport`, requestBody.slice(1))
  ctx.status = result.status
  ctx.body = result.body
}

const eventTransformRequest = (request) => {
  return {
    name: request.name,
    codeType: (request.codeType) ? request.codeType.value : null,
    venue: (request.venue) ? request.venue.value : null,
    club: (request.club) ? request.club.value : null,
    region: (request.region) ? request.region.value : null,
    startDate: request.startDate,
    endDate: request.endDate,
    round: request.round,
    isFta: (request.isFta) || false,
    isPpv: (!request.isFta) || false
  }
}

module.exports = {
  fetchEvents,
  fetchIndividualEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  archiveEvent,
  restoreEvent,
  validateImport
}

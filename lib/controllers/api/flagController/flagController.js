const debug = require('debug')('qms-tradingdesk-client:api:flagController:flagController')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')

const fetchFlagLanguages = async (ctx, next) => {
  debug(fetchFlagLanguages.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/languages`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchFlagCountries = async (ctx, next) => {
  debug(fetchFlagCountries.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/countries`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchFlagRegions = async (ctx, next) => {
  debug(fetchFlagRegions.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/regions`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchFlagTimezones = async (ctx, next) => {
  debug(fetchFlagTimezones.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/timezones`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchFlagRoles = async (ctx, next) => {
  debug(fetchFlagRoles.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/roles`)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  fetchFlagCountries,
  fetchFlagLanguages,
  fetchFlagRegions,
  fetchFlagTimezones,
  fetchFlagRoles
}

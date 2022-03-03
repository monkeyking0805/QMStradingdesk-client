const debug = require('debug')('qms-tradingdesk-client:api:assetController')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')

const fetchSportCodes = async (ctx, next) => {
  debug(fetchSportCodes.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/codes`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchBrands = async (ctx, next) => {
  debug(fetchBrands.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/brands`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchBrandCategories = async (ctx, next) => {
  debug(fetchBrandCategories.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/brand_categories`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchRegions = async (ctx, next) => {
  debug(fetchRegions.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/regions`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchClubs = async (ctx, next) => {
  debug(fetchClubs.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/clubs`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchVenues = async (ctx, next) => {
  debug(fetchVenues.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/venues`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchAssetTypes = async (ctx, next) => {
  debug(fetchAssetTypes.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/assettypes`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchEventTypes = async (ctx, next) => {
  debug(fetchEventTypes.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/codetypes`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchEvents = async (ctx, next) => {
  debug(fetchEvents.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/events`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchAssetsUnit = async (ctx, next) => {
  debug(fetchAssetsUnit)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/assetunits`)
  ctx.status = result.status
  ctx.body = result.body
}

const searchAsset = async (ctx, next) => {
  debug(searchAsset.name)
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/assets/search`, ctx.request.body)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  fetchSportCodes,
  fetchBrandCategories,
  fetchRegions,
  fetchClubs,
  fetchVenues,
  fetchAssetTypes,
  fetchEventTypes,
  fetchBrands,
  fetchEvents,
  fetchAssetsUnit,
  searchAsset
}

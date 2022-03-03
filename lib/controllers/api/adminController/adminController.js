const debug = require('debug')('qms-tradingdesk-client:api:adminController')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { transformRequestQuery } = require('../../../helpers/util')

const fetchAssetUnits = async (ctx, next) => {
  debug(fetchAssetUnits.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/assetunits${transformRequestQuery(ctx.query)}`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchIndividualAssetUnits = async (ctx, next) => {
  debug(fetchAssetUnits.name)
  const { assetUnitID } = ctx.params
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/assetunits/${assetUnitID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchIndividualAssetUnit = async (ctx, next) => {
  debug(fetchAssetUnits.name)
  const { assetUnitID } = ctx.params
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/assetunits/${assetUnitID}`)
  ctx.status = result.status
  ctx.body = result.body
}
const createAssetUnits = async (ctx, next) => {
  debug(createAssetUnits.name)
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/assetunits`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const updateAssetUnits = async (ctx, next) => {
  debug(updateAssetUnits.name)
  const requestUpdate = ctx.request.body
  const { assetUnitID } = ctx.params
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/admin/assetunits/${assetUnitID}`, requestUpdate)
  ctx.status = result.status
  ctx.body = result.body
}

const deleteAssetUnits = async (ctx, next) => {
  debug(deleteAssetUnits.name)
  const { assetUnitID } = ctx.params
  const result = await facadeRequest.request(ctx, 'delete', `${facadeUri}/admin/assetunits/${assetUnitID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const archiveAssetUnits = async (ctx, next) => {
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/assetunits/archive`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const restoreAssetUnits = async (ctx, next) => {
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/assetunits/restore`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  fetchAssetUnits,
  createAssetUnits,
  deleteAssetUnits,
  fetchIndividualAssetUnits,
  fetchIndividualAssetUnit,
  updateAssetUnits,
  archiveAssetUnits,
  restoreAssetUnits
}

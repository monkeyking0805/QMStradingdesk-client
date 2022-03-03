const debug = require('debug')('qms-tradingdesk-client:api:assetTypeController')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { transformRequestQuery } = require('../../../helpers/util')
const { errorMessage } = require('../../../config/message')

const fetchAssetTypes = async (ctx, name) => {
  debug(fetchAssetTypes.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/assettypes${transformRequestQuery(ctx.query)}`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchIndividualAssetType = async (ctx, next) => {
  debug(fetchIndividualAssetType.name)
  if (!ctx.params.hasOwnProperty('assetTypeID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { assetTypeID } = ctx.params
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/assettypes/${assetTypeID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const createAssetType = async (ctx, name) => {
  debug(createAssetType.name)
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/assettypes`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const updateAssetType = async (ctx, next) => {
  debug(updateAssetType.name)
  const requestUpdate = ctx.request.body
  if (!ctx.params.hasOwnProperty('assetTypeID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { assetTypeID } = ctx.params
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/admin/assettypes/${assetTypeID}`, requestUpdate)
  ctx.status = result.status
  ctx.body = result.body
}

const deleteAssetType = async (ctx, next) => {
  debug(deleteAssetType.name)
  if (!ctx.params.hasOwnProperty('assetTypeID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { assetTypeID } = ctx.params
  const result = await facadeRequest.request(ctx, 'delete', `${facadeUri}/admin/assettypes/${assetTypeID}`)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  fetchAssetTypes,
  fetchIndividualAssetType,
  createAssetType,
  updateAssetType,
  deleteAssetType
}

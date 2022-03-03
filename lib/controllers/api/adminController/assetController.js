const debug = require('debug')('qms-tradingdesk-client:api:assetController')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { transformRequestQuery, transformRequestDropdownArray } = require('../../../helpers/util')
const { errorMessage } = require('../../../config/message')

const fetchAssets = async (ctx, name) => {
  debug(fetchAssets.name)
  const { body: requestBody } = ctx.request
  const serverRequest = {
    codes: transformRequestDropdownArray(requestBody.sportCodes),
    events: transformRequestDropdownArray(requestBody.events),
    assetTypes: transformRequestDropdownArray(requestBody.assetTypes),
    name: (requestBody.name) || '',
    archive: (requestBody.archive) || ''
  }
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/assets${transformRequestQuery(ctx.query)}`, serverRequest)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchIndividualAsset = async (ctx, next) => {
  debug(fetchIndividualAsset.name)
  if (!ctx.params.hasOwnProperty('assetID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { assetID } = ctx.params
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/assets/${assetID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const createAsset = async (ctx, name) => {
  debug(createAsset.name)
  const { body: requestBody } = ctx.request
  const serverRequest = {
    assetType: requestBody.assetType.value,
    assetUnit: requestBody.assetUnit.value,
    event: requestBody.event.value,
    name: requestBody.name,
    slots: parseInt(requestBody.slots)
  }
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/assets/create`, serverRequest)
  ctx.status = result.status
  ctx.body = result.body
  debug(ctx)
}

const updateAsset = async (ctx, next) => {
  debug(updateAsset.name)
  const requestUpdate = ctx.request.body
  if (!ctx.params.hasOwnProperty('assetID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { assetID } = ctx.params
  const serverRequest = {
    assetType: requestUpdate.assetType.value,
    assetUnit: requestUpdate.assetUnit.value,
    event: requestUpdate.event.value,
    name: requestUpdate.name,
    slots: parseInt(requestUpdate.slots)
  }
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/admin/assets/${assetID}`, serverRequest)
  ctx.status = result.status
  ctx.body = result.body
}

const deleteAsset = async (ctx, next) => {
  debug(deleteAsset.name)
  if (!ctx.params.hasOwnProperty('assetID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { assetID } = ctx.params
  const result = await facadeRequest.request(ctx, 'delete', `${facadeUri}/admin/assets/${assetID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const archiveAsset = async (ctx, next) => {
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/assets/archive`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const restoreAsset = async (ctx, next) => {
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/assets/restore`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const validateImport = async (ctx, next) => {
  debug(validateImport.name)
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/assets/validateimport`, requestBody.slice(1))
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  fetchAssets,
  fetchIndividualAsset,
  createAsset,
  updateAsset,
  deleteAsset,
  archiveAsset,
  restoreAsset,
  validateImport
}

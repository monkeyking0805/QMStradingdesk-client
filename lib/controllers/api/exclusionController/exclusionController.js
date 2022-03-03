const debug = require('debug')('qms-tradingdesk-client:api:exclusionController')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { transformRequestQuery, transformRequestDropdownArray } = require('../../../helpers/util')
const { errorMessage } = require('../../../config/message')

const fetchIndividualExclusion = async (ctx, next) => {
  debug(fetchIndividualExclusion.name)
  const { clubID } = ctx.params
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/clubs/${clubID}/exclusions`)
  ctx.status = result.status
  ctx.body = result.body
}

const saveExclusion = async (ctx, next) => {
  debug(saveExclusion.name)
  const { body: requestBody } = ctx.request
  const serverRequest = exclusionTransformRequest(requestBody)
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/exclusions/create`, serverRequest)
  ctx.status = result.status
  ctx.body = result.body
}

const updateExclusion = async (ctx, next) => {
  debug(updateExclusion.name)
  if (!ctx.params.hasOwnProperty('exclusionID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { body: requestBody } = ctx.request
  const serverRequest = exclusionTransformRequest(requestBody)
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/admin/exclusions/${ctx.params.exclusionID}`, serverRequest)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchFilterExclusion = async (ctx, next) => {
  debug(fetchFilterExclusion.name)
  const { body: requestBody } = ctx.request
  const serverRequest = {
    brandCategories: transformRequestDropdownArray(requestBody.brandCategories),
    codeTypes: transformRequestDropdownArray(requestBody.codeTypes),
    clubs: transformRequestDropdownArray(requestBody.clubs),
    venues: transformRequestDropdownArray(requestBody.venues),
    assetTypes: transformRequestDropdownArray(requestBody.assetTypes),
    codes: transformRequestDropdownArray(requestBody.sportCodes)
  }
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/exclusions${transformRequestQuery(ctx.query)}`, serverRequest)
  ctx.status = result.status
  ctx.body = result.body
}

const deleteExclusion = async (ctx, next) => {
  debug(deleteExclusion.name)
  if (!ctx.params.hasOwnProperty('exclusionID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const result = await facadeRequest.request(ctx, 'delete', `${facadeUri}/admin/exclusions/${ctx.params.exclusionID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchManageIndividualExclusion = async (ctx, next) => {
  debug(deleteExclusion.name)
  if (!ctx.params.hasOwnProperty('exclusionID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/exclusions/${ctx.params.exclusionID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const exclusionTransformRequest = (request) => {
  return {
    brands: (request.brand) ? [request.brand.value] : [],
    brandCategories: (request.brandCategory) ? [request.brandCategory.value] : [],
    codeTypes: transformRequestDropdownArray(request.eventType),
    clubs: transformRequestDropdownArray(request.clubs),
    venues: transformRequestDropdownArray(request.venues),
    assetTypes: transformRequestDropdownArray(request.assetTypes),
    note: request.notes
  }
}

const validateImport = async (ctx, next) => {
  debug(validateImport.name)
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/exclusions/validateimport`, requestBody.slice(1))
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  fetchIndividualExclusion,
  fetchManageIndividualExclusion,
  fetchFilterExclusion,
  deleteExclusion,
  saveExclusion,
  updateExclusion,
  validateImport
}

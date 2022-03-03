const debug = require('debug')('qms-tradingdesk-client:api:brandController')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { transformRequestQuery } = require('../../../helpers/util')
const { errorMessage } = require('../../../config/message')

const fetchBrands = async (ctx, name) => {
  debug(fetchBrands.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/brands${transformRequestQuery(ctx.query)}`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchIndividualBrand = async (ctx, next) => {
  debug(fetchIndividualBrand.name)
  if (!ctx.params.hasOwnProperty('brandID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { brandID } = ctx.params
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/brands/${brandID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const createBrand = async (ctx, name) => {
  debug(createBrand.name)
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/brands`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const updateBrand = async (ctx, next) => {
  debug(updateBrand.name)
  const requestUpdate = ctx.request.body
  if (!ctx.params.hasOwnProperty('brandID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { brandID } = ctx.params
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/admin/brands/${brandID}`, requestUpdate)
  ctx.status = result.status
  ctx.body = result.body
}

const deleteBrand = async (ctx, next) => {
  debug(deleteBrand.name)
  if (!ctx.params.hasOwnProperty('brandID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { brandID } = ctx.params
  const result = await facadeRequest.request(ctx, 'delete', `${facadeUri}/admin/brands/${brandID}`)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  fetchBrands,
  fetchIndividualBrand,
  createBrand,
  updateBrand,
  deleteBrand
}

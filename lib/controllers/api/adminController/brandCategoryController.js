const debug = require('debug')('qms-tradingdesk-client:api:brandCategoryController')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { transformRequestQuery } = require('../../../helpers/util')
const { errorMessage } = require('../../../config/message')

const fetchBrandCategories = async (ctx, name) => {
  debug(fetchBrandCategories.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/brandcategories${transformRequestQuery(ctx.query)}`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchIndividualBrandCategory = async (ctx, next) => {
  debug(fetchIndividualBrandCategory.name)
  if (!ctx.params.hasOwnProperty('brandCategoryID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { brandCategoryID } = ctx.params
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/brandcategories/${brandCategoryID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const createBrandCategory = async (ctx, name) => {
  debug(createBrandCategory.name)
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/brandcategories`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const updateBrandCategory = async (ctx, next) => {
  debug(updateBrandCategory.name)
  const requestUpdate = ctx.request.body
  if (!ctx.params.hasOwnProperty('brandCategoryID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { brandCategoryID } = ctx.params
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/admin/brandcategories/${brandCategoryID}`, requestUpdate)
  ctx.status = result.status
  ctx.body = result.body
}

const deleteBrandCategory = async (ctx, next) => {
  debug(deleteBrandCategory.name)
  const { brandCategoryID } = ctx.params
  const result = await facadeRequest.request(ctx, 'delete', `${facadeUri}/admin/brandcategories/${brandCategoryID}`)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  fetchBrandCategories,
  fetchIndividualBrandCategory,
  createBrandCategory,
  updateBrandCategory,
  deleteBrandCategory
}

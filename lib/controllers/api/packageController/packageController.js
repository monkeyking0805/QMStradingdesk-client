const debug = require('debug')('qms-tradingdesk-client:api:packageController')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { transformRequestQuery } = require('../../../helpers/util')
const { facadeUri } = require('../../../config/environment')
const { errorMessage } = require('../../../config/message')

const savePackage = async (ctx, next) => {
  debug(savePackage.name)
  const { body: requestBody } = ctx.request
  const serverRequest = {
    name: requestBody.bookingName,
    notes: requestBody.notes,
    client: {
      firstname: requestBody.firstName,
      lastname: requestBody.lastName,
      company_name: requestBody.client,
      agency_name: requestBody.agencyName
    },
    brand_categories: requestBody.brandCategories,
    assets: requestBody.assets
  }
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/packages`, serverRequest)
  ctx.status = result.status
  ctx.body = result.body
}

const updatePackage = async (ctx, next) => {
  debug(updatePackage.name)
  const { body: requestBody } = ctx.request
  if (!ctx.params.hasOwnProperty('packageID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const serverRequest = {
    name: requestBody.bookingName,
    notes: requestBody.notes,
    client: {
      firstname: requestBody.firstName,
      lastname: requestBody.lastName,
      company_name: requestBody.client,
      agency_name: requestBody.agencyName
    },
    brand_categories: requestBody.brandCategories,
    assets: requestBody.assets
  }
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/packages/${ctx.params.packageID}`, serverRequest)
  ctx.status = result.status
  ctx.body = result.body
}

const submitPackage = async (ctx, next) => {
  debug(submitPackage.name)
  const { body: requestBody } = ctx.request
  const serverRequest = {
    name: requestBody.bookingName,
    notes: requestBody.notes,
    client: {
      firstname: requestBody.firstName,
      lastname: requestBody.lastName,
      company_name: requestBody.client,
      agency_name: requestBody.agencyName
    },
    brand_categories: requestBody.brandCategories,
    assets: requestBody.assets
  }
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/packages/submit`, serverRequest)
  ctx.status = result.status
  ctx.body = result.body
}

const submitUpdatePackage = async (ctx, next) => {
  debug(submitUpdatePackage.name)
  const { body: requestBody } = ctx.request
  if (!ctx.params.hasOwnProperty('packageID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const serverRequest = {
    name: requestBody.bookingName,
    notes: requestBody.notes,
    client: {
      firstname: requestBody.firstName,
      lastname: requestBody.lastName,
      company_name: requestBody.client,
      agency_name: requestBody.agencyName
    },
    brand_categories: requestBody.brandCategories,
    assets: requestBody.assets
  }
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/packages/${ctx.params.packageID}/submit`, serverRequest)
  ctx.status = result.status
  ctx.body = result.body
}

const confirmPackage = async (ctx, next) => {
  debug(confirmPackage.name)
  const { body: requestBody } = ctx.request
  if (!ctx.params.hasOwnProperty('packageID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const serverRequest = {
    name: requestBody.bookingName,
    notes: requestBody.notes,
    client: {
      firstname: requestBody.firstName,
      lastname: requestBody.lastName,
      company_name: requestBody.client,
      agency_name: requestBody.agencyName
    },
    brand_categories: requestBody.brandCategories,
    assets: requestBody.assets
  }
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/packages/${ctx.params.packageID}/confirm`, serverRequest)
  ctx.status = result.status
  ctx.body = result.body
}

const getPackages = async (ctx, next) => {
  debug(getPackages.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/packages${transformRequestQuery(ctx.query)}`)
  ctx.status = result.status
  ctx.body = result.body
}

const getIndividualPackage = async (ctx, next) => {
  debug(getIndividualPackage.name)
  if (!ctx.params.hasOwnProperty('packageID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/packages/${ctx.params.packageID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const deletePackage = async (ctx, next) => {
  debug(deletePackage.name)
  if (!ctx.params.hasOwnProperty('packageID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const result = await facadeRequest.request(ctx, 'delete', `${facadeUri}/packages/${ctx.params.packageID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const archivePackage = async (ctx, next) => {
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/packages/archive`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

const restorePackage = async (ctx, next) => {
  const { body: requestBody } = ctx.request
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/packages/restore`, requestBody)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  savePackage,
  getPackages,
  updatePackage,
  getIndividualPackage,
  submitPackage,
  submitUpdatePackage,
  confirmPackage,
  deletePackage,
  archivePackage,
  restorePackage
}

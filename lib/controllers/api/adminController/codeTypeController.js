const debug = require('debug')('qms-tradingdesk-client:api:codeTypeController')
const Boom = require('boom')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { transformRequestQuery } = require('../../../helpers/util')
const { errorMessage } = require('../../../config/message')

const fetchCodeTypes = async (ctx, name) => {
  debug(fetchCodeTypes.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/codeTypes${transformRequestQuery(ctx.query)}`)
  ctx.status = result.status
  ctx.body = result.body
}

const fetchIndividualCodeType = async (ctx, next) => {
  debug(fetchIndividualCodeType.name)
  if (!ctx.params.hasOwnProperty('codeTypeID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { codeTypeID } = ctx.params
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/admin/codeTypes/${codeTypeID}`)
  ctx.status = result.status
  ctx.body = result.body
}

const createCodeType = async (ctx, name) => {
  debug(createCodeType.name)
  const { body: requestBody } = ctx.request
  const codeTypeRequest = {
    name: requestBody.name,
    code: requestBody.code.value
  }
  const result = await facadeRequest.request(ctx, 'post', `${facadeUri}/admin/codeTypes`, codeTypeRequest)
  ctx.status = result.status
  ctx.body = result.body
}

const updateCodeType = async (ctx, next) => {
  debug(updateCodeType.name)
  if (!ctx.params.hasOwnProperty('codeTypeID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { codeTypeID } = ctx.params
  const { body: requestBody } = ctx.request
  const codeTypeRequest = {
    name: requestBody.name,
    code: requestBody.code.value
  }
  const result = await facadeRequest.request(ctx, 'put', `${facadeUri}/admin/codeTypes/${codeTypeID}`, codeTypeRequest)
  ctx.status = result.status
  ctx.body = result.body
}

const deleteCodeType = async (ctx, next) => {
  debug(deleteCodeType.name)
  if (!ctx.params.hasOwnProperty('codeTypeID')) {
    ctx.throw(400, JSON.stringify(Boom.badRequest(errorMessage.invalidRequest).output.payload))
  }
  const { codeTypeID } = ctx.params
  const result = await facadeRequest.request(ctx, 'delete', `${facadeUri}/admin/codeTypes/${codeTypeID}`)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  fetchCodeTypes,
  fetchIndividualCodeType,
  createCodeType,
  updateCodeType,
  deleteCodeType
}

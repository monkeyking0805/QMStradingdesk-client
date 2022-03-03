const debug = require('debug')('qms-tradingdesk-client:api:venueController')
const facadeRequest = require('../../../module/requestFacade')
const { facadeUri } = require('../../../config/environment')
const { transformRequestQuery } = require('../../../helpers/util')

const getPackages = async (ctx, name) => {
  debug(getPackages.name)
  const result = await facadeRequest.request(ctx, 'get', `${facadeUri}/qlik/packages${transformRequestQuery(ctx.query)}`)
  ctx.status = result.status
  ctx.body = result.body
}

module.exports = {
  getPackages
}

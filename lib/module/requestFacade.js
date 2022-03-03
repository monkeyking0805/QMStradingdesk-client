const debug = require('debug')('qms-tradingdesk-client:module:requestFacade')
const error = require('debug')('qms-tradingdesk-client:module:requestFacade:error')
const axios = require('axios')

const request = async (ctx, method, url, body = {}, extraOptions = {}) => {
  debug(request.name, url)
  const { header: headers } = ctx.request
  delete headers.host
  try {
    // More document about axios https://github.com/axios/axios
    const response = await axios({
      method,
      url,
      headers,
      data: body,
      ...extraOptions
    })
    return {
      status: response.status,
      header: response.headers,
      body: response.data
    }
  } catch (err) {
    error(request.name, err)
    const { response } = err
    return {
      status: response ? response.status : 500,
      header: response ? response.header : {},
      body: response ? response.data : { message: err.message }
    }
  }
}

module.exports = {
  request
}

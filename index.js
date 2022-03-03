'use strict'

;(async () => {
  // load config
  require('dotenv').config()
  const debug = require('debug')('qms-tradingdesk-client:view-service:index')
  const error = require('debug')('qms-tradingdesk-client:view-service:index:error')
  const config = require('./lib/config')
  // start the service
  try {
    require('./lib/app')()
    debug(`${config.static.app.start} on port ${config.env.port}`)
  } catch (e) {
    error(e)
    error(config.error.unknown)
  }
})()

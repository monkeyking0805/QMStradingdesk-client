'use strict'

const debug = require('debug')('qms-tradingdesk-client:controllers:web:home')

module.exports = {
  index
}

async function index (ctx) {
  debug(index.name)
  ctx.render('index')
}

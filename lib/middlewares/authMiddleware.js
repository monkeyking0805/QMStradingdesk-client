'use strict'

const { jwtSecretKey } = require('../config/environment')
const koaJwt = require('koa-jwt')
module.exports = koaJwt({
  secret: jwtSecretKey
})

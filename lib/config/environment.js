'use strict'
require('dotenv').config()

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'production',
  port: process.env.PORT || 3000,
  facadeUri: process.env.FACADE_URI || 'http://localhost:3001',
  jwtSecretKey: process.env.JWT_SECRET_KEY
}

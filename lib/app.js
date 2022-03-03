'use strict'

const debug = require('debug')('view-service:app')
const error = require('debug')('view-service:app:error')
const path = require('path')
const serve = require('koa-static')
const Pug = require('koa-pug')
const Koa = require('koa')
const config = require('./config')
const bodyparser = require('koa-bodyparser')
const health = require('koa-heartbeat')(config.static.app.health)
const { router } = require('./middlewares')

module.exports = () => {
  const app = new Koa()
  // enable validation
  require('koa-validate')(app)
  // health check
  app.use(health)
  // routing
  app.use(bodyparser())
  // declare template engine
  const pug = new Pug({
    viewPath: path.join(__dirname, 'views'),
    debug: false,
    pretty: false,
    compileDebug: false
  })
  pug.use(app)
  // serve static files
  app.use(serve('public'))
  // routing
  app.use(router().routes())
  // handle 404
  app.use(async (ctx, next) => {
    if (ctx.status === 404) {
      ctx.status = 404
    }
  })
  // return app instance
  return app
    .listen(config.env.port)
    .on('error', err => _handleErr(err))
}

function _handleErr (err) {
  debug(_handleErr.name)
  error(err.message)
}

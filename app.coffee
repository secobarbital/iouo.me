express = require 'express'
http = require 'http'
teacup = require 'teacup/lib/express'

db = require './config/db'
ddocs = require './ddocs'
piler = require 'piler'
pilez = require './config/piler'
routes = require './routes'

ddocs.update()

app = express()
srv = http.createServer app

css = piler.createCSSManager()
js = piler.createJSManager()
pilez.set css, js

app.configure ->
  app.set 'port', process.env.PORT || 3000
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'coffee'
  app.engine 'coffee', teacup.renderFile
  app.use express.favicon "#{__dirname}/public/favicon.ico"
  app.use express.logger 'dev'
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.compress()
  app.use app.router
  app.use express.static "#{__dirname}/public"

  js.bind app, srv
  css.bind app, srv

  console.log 'addFile'
  css.addFile "#{__dirname}/public/css/bootstrap.css"
  css.addFile "#{__dirname}/public/css/application.css"

  js.addFile "#{__dirname}/public/js/jquery-2.0.3.custom.js"
  js.addFile "#{__dirname}/public/js/jquery.timeago.js"
  js.addFile "#{__dirname}/public/js/application.js"

app.configure 'development', ->
  app.use express.errorHandler()

app.get '/', routes.refresh, routes.index
app.get '/owe', routes.owe
app.get '/balances/:ower', routes.refresh, routes.balances
app.get '/transactions/:ower/:owee', routes.refresh, routes.transactions

console.log 'listen'
srv.listen app.get('port'), ->
  console.log "Express server listening on port #{app.get('port')}"

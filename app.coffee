express = require 'express'
http = require 'http'
teacup = require 'teacup/lib/express'

db = require './config/db'
ddocs = require './ddocs'
routes = require './routes'

ddocs.update()

app = express()

app.configure ->
  app.set 'port', process.env.PORT || 3000
  app.set 'views', "#{__dirname}/views"
  app.set 'view engine', 'coffee'
  app.engine 'coffee', teacup.renderFile
  app.use express.logger 'dev'
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.compress()
  app.use app.router
  app.use express.static "#{__dirname}/favicons", maxAge: 86400000
  app.use express.static "#{__dirname}/public", maxAge: 31536000000

app.configure 'development', ->
  app.use express.errorHandler()

app.get '/', routes.refresh, routes.index
app.get '/owe', routes.owe
app.get '/balances/:ower', routes.refresh, routes.balances
app.get '/transactions/:ower/:owee', routes.refresh, routes.transactions

http.createServer(app).listen app.get('port'), ->
  console.log "Express server listening on port #{app.get('port')}"

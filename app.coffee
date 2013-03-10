express = require 'express'
http = require 'http'
path = require 'path'
teacup = require 'teacup/lib/express'

routes = require './routes'

app = express()

app.configure ->
  app.set 'port', process.env.PORT || 3000
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'coffee'
  app.engine 'coffee', teacup.renderFile
  app.use express.logger 'dev'
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use require('stylus').middleware src: "#{__dirname}/public"
  app.use require('connect-coffee-script') src: "#{__dirname}/public"
  app.use express.static path.join __dirname, 'public'

app.configure 'development', ->
  app.use express.errorHandler()

app.get '/', routes.index
app.get '/transactions/:ower/:owee', routes.ledger

http.createServer(app).listen app.get('port'), ->
  console.log "Express server listening on port #{app.get('port')}"

events = require 'events'

db = require '../config/db'
geodb = require '../config/geodb'

emitter = new events.EventEmitter

announce = (user, neighbors) ->
  @write 'data: '
  @write JSON.stringify neighbors
  @write '\n\n'

exports.roulette = (req, res, next) ->
  res.render 'roulette',
    user: req.params.user

exports.updatePosition = (req, res, next) ->
  geodb.update req.params.user, req.body.position, (err) ->
    return next err if err
  geodb.nearby req.params.user, req.body.position, (err, neighbors) ->
    return next err if err
    emitter.emit 'nearby', (neighbor.user for neighbor in neighbors)

exports.sse = (req, res, next) ->
  req.socket.setTimeout Infinity
  res.writeHead 200,
    'Content-Type': 'text/event-stream'
    'Cache-Control': 'no-cache'
    'Connection': 'keep-alive'
  next()

exports.nearby = (req, res, next) ->
  myAnnounce = announce.bind res, req.params.user
  emitter.on req.path, myAnnounce
  req.on 'close', ->
    emitter.removeListener req.path, myAnnounce

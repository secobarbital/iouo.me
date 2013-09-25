_ = require 'lodash'
accounting = require 'accounting'
events = require 'events'

db = require '../config/db'
geodb = require '../config/geodb'
neighborsView = require '../views/neighbors'
IOU = require '../models/iou'

emitter = new events.EventEmitter

announce = (res, user, neighbors) ->
  return unless user in neighbors
  neighbors = _.without neighbors, user

  IOU.balancesFor user, (err, balances) ->
    return next err if err

    balances = balances.filter (balance) -> balance.key[1] in neighbors

    owees = (balance.key[1] for balance in balances)
    for neighbor in neighbors when neighbor not in owees
      balances.push
        key: [user, neighbor]
        value: 0

    total = balances.reduce (a, b) ->
      a + b.value
    , 0

    res.write 'data: '
    res.write JSON.stringify
      headline: accounting.formatMoney -total, ''
      neighbors: neighborsView
        balances: balances
        ower: user
        total: total
    res.write '\n\n'

exports.roulette = (req, res, next) ->
  res.render 'roulette',
    user: req.params.user

exports.updatePosition = (req, res, next) ->
  geodb.update req.params.user, req.body.position, (err) ->
    return next err if err
    res.send 202
  geodb.nearby req.body.position, (err, neighbors) ->
    return console.error err if err
    neighborUsers = (neighbor.user for neighbor in neighbors)
    neighborUsers.push(req.params.user) unless req.params.user in neighborUsers
    emitter.emit 'nearby', neighborUsers

exports.sse = (req, res, next) ->
  req.socket.setTimeout Infinity
  res.writeHead 200,
    'Content-Type': 'text/event-stream'
    'Cache-Control': 'no-cache'
    'Connection': 'keep-alive'
  next()

exports.nearby = (req, res, next) ->
  myAnnounce = announce.bind null, res, req.params.user
  emitter.on 'nearby', myAnnounce
  req.on 'close', ->
    emitter.removeListener 'nearby', myAnnounce
    geodb.remove req.params.user, (err, doc) ->
      return console.error err if err
      if doc
        geodb.nearby doc.raw, (err, neighbors) ->
          return console.error err if err
          emitter.emit 'nearby', (neighbor.user for neighbor in neighbors)

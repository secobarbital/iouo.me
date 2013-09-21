async = require 'async'
MongoClient = require('mongodb').MongoClient

geo = require '../lib/geo'

url = process.env['MONGODB_URL'] || process.env['MONGOLAB_URI'] || 'mongodb://localhost/iouome'

pos2geo = (position) ->
  geo.polygon(+position.coords.longitude, +position.coords.latitude, (+position.coords.accuracy+100)/1000)

MongoClient.connect url, (err, db) ->
  return console.error err if err
  positions = db.collection 'positions'
  positions.ensureIndex { timestamp: 1 }, { expireAfterSeconds: 600 }, (err) ->
    return console.error err if err
  positions.ensureIndex { loc: '2dsphere' }, (err) ->
    return console.error err if err

  exports.update = (user, position, cb) ->
    doc =
      raw: position
      user: user
      timestamp: new Date parseInt position.timestamp
      loc: pos2geo position
    positions.update { user: user }, doc, { upsert: true }, cb

  exports.remove = (user, cb) ->
    positions.findAndModify { user: user }, [], {}, { remove: true }, cb

  exports.nearby = (position, cb) ->
    query =
      loc:
        $geoIntersects:
          $geometry: pos2geo position
    positions.find(query).toArray cb

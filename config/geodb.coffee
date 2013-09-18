async = require 'async'
MongoClient = require('mongodb').MongoClient

url = process.env['MONGODB_URL'] || 'mongodb://localhost/iouome'

pos2geo = (position) ->
  type: 'Point'
  coordinates: [parseFloat(position.coords.longitude), parseFloat(position.coords.latitude)]

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

  exports.nearby = (user, position, cb) ->
    query =
      loc:
        $near:
          $geometry: pos2geo position
        $maxdistance: 100
    positions.find(query).toArray cb

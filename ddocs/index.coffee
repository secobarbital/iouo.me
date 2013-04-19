db = require '../config/db'
ddocs = [require './iouome']

exports.update = ->
  for ddoc in ddocs
    db.get ddoc._id, (err, doc) ->
      if err
        return upload ddoc if err.status_code == 404
        return console.error 'Error getting', ddoc._id, err.message
      rev = doc._rev
      delete doc._rv
      if JSON.stringify(ddoc, replacer) != JSON.stringify(doc)
        ddoc._rev = rev
        upload ddoc

replacer = (key, value) ->
  return value.toString() if typeof(value) == 'function'
  value

upload = (ddoc) ->
  db.insert ddoc, (err) ->
    return console.error 'Error uploading', ddoc._id, err.message if err

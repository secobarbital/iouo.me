nano = require 'nano'

url = process.env.COUCHDB_URL || process.env.CLOUDANT_URL || 'http://localhost:5984'
module.exports = nano(url).db.use 'iouome'

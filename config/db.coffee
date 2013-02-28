nano = require('nano')(process.env.COUCHDB_URL || process.env.CLOUDANT_URL || 'http://localhost:5984')

module.exports = nano.db.use 'iouome'

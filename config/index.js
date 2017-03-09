module.exports = {
  COUCHDB_URL_READONLY: process.env.COUCHDB_URL_READONLY || process.env.COUCHDB_URL || 'http://localhost:5984',
  COUCHDB_NAME: process.env.COUCHDB_NAME || 'iouome'
}

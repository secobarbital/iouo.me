module.exports = {
  publicRuntimeConfig: {
    couchdbName: process.env.COUCHDB_NAME || 'iouome',
    couchdbUrl: process.env.COUCHDB_URL_READONLY || 'http://localhost:5984'
  }
}

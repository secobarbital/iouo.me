var nano = require('nano');
var url = process.env.COUCHDB_URL || process.env.CLOUDANT_URL || 'http://localhost:5984';
var dbName = process.env.COUCHDB_DATABASE || process.env.CLOUDANT_DATABASE || 'iouome'
var db = nano(url).db.use(dbName);

module.exports = db;

var nano = require('nano');

var url = process.env.COUCHDB_URL || process.env.CLOUDANT_URL || 'http://localhost:5984';
var db = process.env.COUCHDB_DATABASE || process.env.CLOUDANT_DATABASE || 'iouome';

module.exports = nano(url).use(db);

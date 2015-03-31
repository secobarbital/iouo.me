var nano = require('nano');

var dbUrl = process.env.COUCHDB_URL || process.env.CLOUDANT_URL || 'http://localhost:5984';
var dbName = process.env.COUCHDB_DATABASE || process.env.CLOUDANT_DATABASE || 'iouome';

var db = nano(dbUrl).use(dbName);

db.pinsert = function(doc, params) {
  return new Promise(function(resolve, reject) {
    db.insert(doc, params, function(err, res) {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

db.pview = function(design, view, params) {
  return new Promise(function(resolve, reject) {
    db.view(design, view, params, function(err, res) {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

module.exports = db;

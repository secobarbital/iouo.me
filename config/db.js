var nano = require('nano');
var url = process.env.COUCHDB_URL || process.env.CLOUDANT_URL || 'http://localhost:5984';
var dbName = process.env.COUCHDB_DATABASE || process.env.CLOUDANT_DATABASE || 'iouome'
var db = nano(url).db.use(dbName);

db.balances = function(ower, owee, stale) {
  var params;
  if (owee) {
    params = {
      descending: true,
      reduce: false,
      startkey: [ower, owee, {}],
      endkey: [ower, owee],
      include_docs: true
    };
  } else if (ower) {
    params = {
      group_level: 2,
      startkey: [ower],
      endkey: [ower, {}]
    };
  } else {
    params = {
      group_level: 1
    };
  }
  if (stale) {
    params.stale = 'update_after';
  }
  return db.view('iouome', 'balances', params);
}

module.exports = db;

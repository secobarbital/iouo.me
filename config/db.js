var nano = require('nano');

var url = process.env.COUCHDB_URL || process.env.CLOUDANT_URL || 'http://localhost:5984';
var dbName = process.env.COUCHDB_DATABASE || process.env.CLOUDANT_DATABASE || 'iouome';
var db = nano(url).use(dbName);

db.getBalances = function(reqParams, cb) {
    var ower = reqParams.ower;
    var owee = reqParams.owee;
    var params;

    if (owee) {
        params = {
            startkey: [ower, owee, {}],
            endkey: [ower, owee],
            descending: true,
            reduce: false,
            include_docs: true
        };
    } else if (ower) {
        params = {
            group_level: 2,
            startkey: [ower],
            endkey: [ower, {}]
        };
    } else {
        params = { group_level: 1 };
    }

    return db.view('iouome', 'balances', params, cb);
}

module.exports = db;

var request = require('superagent');

var dbUrl = process.env.COUCHDB_URL || process.env.CLOUDANT_URL || 'http://localhost:5984';
var dbName = process.env.COUCHDB_DATABASE || process.env.CLOUDANT_DATABASE || 'iouome';

var db = {
  insert: function(body, cb) {
    var id = body._id;
    var req = id ? request.put : request.post;
    req = req([dbUrl, dbName, encodeURIComponent(id)].join('/'))
    .send(body);
    return cb ? req.end(cb) : req;
  },

  view: function(design, view, params, cb) {
    var req = request.get([dbUrl, dbName, '_design', design, '_view', view].join('/'))
    .query(params);
    return cb ? req.end(cb) : req;
  },

  pinsert: function(doc) {
    return new Promise(function(resolve, reject) {
      insert(doc, function(err, res) {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  pview: function(design, view, params) {
    return new Promise(function(resolve, reject) {
      view(design, view, params, function(err, res) {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
};

module.exports = db;

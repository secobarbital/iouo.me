var supercouch = require('supercouch');

var url = process.env.COUCHDB_URL || process.env.CLOUDANT_URL || 'http://localhost:5984';
var dbName = process.env.COUCHDB_DATABASE || process.env.CLOUDANT_DATABASE || 'iouome'
var couch = supercouch(url);
var db = couch.db(dbName);
var insertWithoutEncodeId = db.insert.bind(db);

function isFn (fn) {
  return '[object Function]' === Object.prototype.toString.call(fn);
}

db.insert = function(body, fn) {
  var req = insertWithoutEncodeId(body);
  var reqOpts = req.reqOpts;
  reqOpts.path = reqOpts.path.map(encodeURIComponent);
  if (isFn(fn)) req.end(fn);
  return req;
}

db.view = function(design, view, params, fn) {
  if (isFn(params)) fn = params, params = null;
  var path = `${process.env.CLOUDANT_DATABASE}/_design/${design}/_view/${view}`;
  var req = couch.request('get', path);
  if (params) req.query(params);
  if (isFn(fn)) req.end(fn);
  return req;
}

db.pinsert = function(doc) {
  return new Promise(function(resolve, reject) {
    db.insert(doc, function(err, res) {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

db.pview = function(design, view, params) {
  return new Promise(function(resolve, reject) {
    db.view(design, view, params, function(err, res) {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

module.exports = db;

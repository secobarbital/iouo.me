var async = require('async');
var MongoClient = require('mongodb').MongoClient;

var geo = require('../lib/geo');

var url = process.env.MONGODB_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/iouome';

function pos2geo(position) {
  var maxDistance = 10;
  return geo.polygon(+position.coords.longitude, +position.coords.latitude, (+position.coords.accuracy+maxDistance/2)/1000);
}

MongoClient.connect(url, function(err, db) {
  if (err) {
    return console.error('Error connecting to MongoDB', err);
  }
  var positions = db.collection('positions');
  var timeIndex = { timestamp: 1 };
  var timeIndexOptions = { expireAfterSeconds: 600 };
  var spaceIndex = { loc: '2dsphere' };
  positions.ensureIndex(timeIndex, timeIndexOptions, function(err) {
    if (err) {
      return console.error('Error creating timestamp index in MongoDB', err);
    }
  });
  positions.ensureIndex(spaceIndex, function(err) {
    if (err) {
      return console.error('Error creating loc index in MongoDB', err);
    }
  });

  exports.update = function(user, position, cb) {
    var doc = {
      raw: position,
      user: user,
      timestamp: new Date(parseInt(position.timestamp)),
      loc: pos2geo(position)
    };
    positions.update({
      user: user
    }, doc, {
      upsert: true
    }, cb);
  };

  exports.remove = function(user, cb) {
    positions.findAndModify({
      user: user
    }, [], {}, {
      remove: true
    }, cb);
  };

  exports.nearby = function(position, cb) {
    var query = {
      loc: {
        $geoIntersects: {
          $geometry: pos2geo(position)
        }
      }
    };
    positions.find(query).toArray(cb);
  };
});

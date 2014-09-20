var db = require('../config/db');
var ddocs = [
    require('./iouome')
]

exports.update = function() {
    ddocs.forEach(function(ddoc) {
        db.get(ddoc._id, function(err, doc) {
            if (err) {
                if (err.status_code === 404) {
                    return upload(ddoc);
                }
                return console.error('Error getting', ddoc_.id, err.message);
            }
            var rev = doc._rev;
            delete doc._rev;
            var newDoc = JSON.stringify(ddoc, replacer);
            var oldDoc = JSON.stringify(doc);
            if (newDoc !== oldDoc) {
                ddoc._rev = rev;
                upload(ddoc);
            }
        });
    });
}

function replacer(key, value) {
  if (typeof value === 'function') {
    return value.toString();
  }
  return value;
}

function upload(ddoc) {
  console.log('Uploading', ddoc._id);
  db.insert(ddoc, function(err) {
    if (err) {
        return console.error('Error uploading', ddoc._id, err.message);
    }
  });
}

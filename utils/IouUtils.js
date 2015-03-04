var db = require('../config/db');

var IouUtils = {
  lastId: function(cb) {
    var params = {
      descending: true,
      limit: 1
    };
    db.view('iouome', 'by_raw_id', params, function(err, res) {
      if (err) {
        return cb('IouUtils.latest: ' + err);
      }
      cb(null, res.rows.length && res.rows[0].key);
    });
  }
};

module.exports = IouUtils;

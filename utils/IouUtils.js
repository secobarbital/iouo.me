var db = require('../config/db');

var IouUtils = {
  lastId: function() {
    return new Promise(function(resolve, reject) {
      var params = {
        descending: true,
        limit: 1
      };
      db.view('iouome', 'by_raw_id', params, function(err, res) {
        if (err) return reject(err);
        resolve(res.rows.length && res.rows[0].key);
      });
    });
  }
};

module.exports = IouUtils;

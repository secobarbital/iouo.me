var db = require('../config/db');

var IouUtils = {
  lastId: function() {
    var params = {
      descending: true,
      limit: 1
    };
    return db.pview('iouome', 'by_raw_id', params)
      .then(function(res) {
        return res.rows.length && res.rows[0].key;
      });
  }
};

module.exports = IouUtils;

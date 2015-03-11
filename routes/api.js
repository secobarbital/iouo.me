var express = require('express');

var db = require('../config/db');

var router = express.Router();

function jsonRes(req, res, next) {
  res.type('json');
  next();
}

router.get('/owers', jsonRes, function(req, res, next) {
  var params = { group_level: 1 };
  db.view('iouome', 'balances', params).pipe(res);
});

router.get('/owers/:ower/owees', jsonRes, function(req, res, next) {
  var ower = req.params.ower;
  var params = {
    group_level: 2,
    startkey: [ower],
    endkey: [ower, {}]
  };
  db.view('iouome', 'balances', params).pipe(res);
});

router.get('/owers/:ower/owees/:owee/transactions', jsonRes, function(req, res, next) {
  var ower = req.params.ower;
  var owee = req.params.owee;
  var params = {
    descending: true,
    reduce: false,
    startkey: [ower, owee, {}],
    endkey: [ower, owee],
    include_docs: true
  };
  db.view('iouome', 'balances', params).pipe(res);
});

module.exports = router;

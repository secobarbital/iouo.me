var express = require('express');

var db = require('../config/db');

var router = express.Router();

router.get('/', function(req, res, next) {
  db.balances().pipe(res);
});

router.get('/:ower', function(req, res, next) {
  var ower = req.params.ower;
  db.balances(ower).pipe(res);
});

router.get('/:ower/:owee', function(req, res, next) {
  var ower = req.params.ower;
  var owee = req.params.owee;
  db.balances(ower, owee).pipe(res);
});

module.exports = router;

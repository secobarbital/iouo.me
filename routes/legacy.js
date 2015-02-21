var express = require('express');

var db = require('../config/db');

var router = express.Router();

router.get('/balances/:ower', function(req, res, next) {
  var ower = req.params.ower;
  res.redirect('/' + ower);
});

router.get('/transactions/:ower/:owee', function(req, res, next) {
  var ower = req.params.ower;
  var owee = req.params.owee;
  res.redirect('/' + ower + '/' + owee);
});

module.exports = router;

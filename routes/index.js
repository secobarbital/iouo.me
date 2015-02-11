var express = require('express');

var db = require('../config/db');

var router = express.Router();

router.get('/', function(req, res, next) {
  if (!req.accepts('html')) return next();
  res.render('index', { title: 'iouo.me' });
});

router.get('/:ower', function(req, res, next) {
  if (!req.accepts('html')) return next();
  var ower = req.params.ower;
  res.render('index', { title: `@${ower} on iouo.me` });
});

router.get('/:ower/:owee', function(req, res, next) {
  if (!req.accepts('html')) return next();
  var ower = req.params.ower;
  var owee = req.params.owee;
  res.render('index', { title: `@${owee} and @${ower} on iouo.me` });
});

router.get('/', function(req, res, next) {
  var options = { group_level: 1 };
  db.view('iouome', 'balances', options).pipe(res);
});

module.exports = router;

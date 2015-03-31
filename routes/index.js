var express = require('express');

var db = require('../config/db');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'iouo.me' });
});

router.get('/:ower', function(req, res, next) {
  var ower = req.params.ower;
  res.render('index', { title: `@${ower} on iouo.me` });
});

router.get('/:ower/:owee', function(req, res, next) {
  var ower = req.params.ower;
  var owee = req.params.owee;
  res.render('index', { title: `@${owee} and @${ower} on iouo.me` });
});

router.get('/owe', function(req, res, next) {
  res.render('index', { title: 'Owe someone on iouo.me' });
});

router.get('/owe/:owee', function(req, res, next) {
  var owee = req.params.owee;
  res.render('index', { title: `Owe @${owee} on iouo.me` });
});

router.get('/owe/:ower/:owee', function(req, res, next) {
  var ower = req.params.ower;
  var owee = req.params.owee;
  res.render('index', { title: `Owe @${owee} on iouo.me` });
});

module.exports = router;

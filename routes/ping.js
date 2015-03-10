var express = require('express');

var db = require('../config/db');
var TwitterUtils = require('../utils/TwitterUtils');

var router = express.Router();

router.get('/', function(req, res, next) {
  TwitterUtils.search()
    .catch(function(err) {
      console.error('Error searching twitter during ping', err.stack || err)
    });
  res.sendStatus(204);
});

module.exports = router;

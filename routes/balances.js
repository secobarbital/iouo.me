var express = require('express');
var db = require('../config/db');
var router = express.Router();

router.get('/', function(req, res) {
    var params = { group_level: 1 };
    db.view('iouome', 'balances', params).pipe(res);
});

module.exports = router;

var express = require('express');
var db = require('../config/db');
var router = express.Router();

function handler(req, res) {
    db.getBalances(req.params).pipe(res);
}

router.get('/', handler);
router.get('/:ower', handler);
router.get('/:ower/:owee', handler);

module.exports = router;

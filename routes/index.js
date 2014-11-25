var express = require('express');
var db = require('../config/db');
var layout = require('./layout');
var safeStringify = require('../lib/safeStringify');
var router = express.Router();

function handler(req, res, next) {
    res.write(layout.prologue);
    res.end(layout.epilogue);
}

router.get('/', handler);
router.get('/:ower', handler);
router.get('/:ower/:owee', handler);

module.exports = router;

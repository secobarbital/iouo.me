var express = require('express');
var Router = require('react-router');
var RoutesFactory = require('../components/RoutesFactory');
var db = require('../config/db');
var layout = require('./layout');
var safeStringify = require('../helpers/safeStringify');
var router = express.Router();

function handler(req, res, next) {
    res.write(layout.prologue);
    db.getBalances(req.params, function(err, data) {
        if (err) {
            return next(err);
        }
        Router.renderRoutesToString(RoutesFactory(data), req.originalUrl, function(err, abortReason, html) {
            if (err) {
                return next(err);
            }
            if (abortReason) {
                return next(abortReason);
            }
            res.write(html);
            res.end(layout.epilogue.replace('DATA', safeStringify(data)));
        });
    });
}

router.get('/', handler);
router.get('/:ower', handler);
router.get('/:ower/:owee', handler);

module.exports = router;

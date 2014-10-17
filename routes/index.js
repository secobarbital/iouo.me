var express = require('express');
var Router = require('react-router');
var RoutesFactory = require('../components/RoutesFactory');
var db = require('../config/db');
var layout = require('./layout');
var safeStringify = require('../helpers/safeStringify');
var router = express.Router();

router.get('/', function(req, res, next) {
    var params = { group_level: 1 };
    res.write(layout.prologue);
    db.view('iouome', 'balances', params, function(err, data) {
        if (err) {
            return next(err);
        }
        Router.renderRoutesToString(RoutesFactory(data), req.originalUrl, function(error, abortReason, html) {
            res.write(html);
            res.end(layout.epilogue.replace('DATA', safeStringify(data)));
        });
    });
});

module.exports = router;

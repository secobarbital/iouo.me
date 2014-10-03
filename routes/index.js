var express = require('express');
var React = require('react');
var db = require('../config/db');
var layout = require('./layout');
var App = require('../components/App');
var OwersPage = require('../components/OwersPage');
var router = express.Router();

router.get('/', function(req, res, next) {
    var params = { group_level: 1 };
    res.write(layout.prologue);
    db.view('iouome', 'balances', params, function(err, data) {
        if (err) {
            return next(err);
        }
        var page = React.renderComponentToString(OwersPage(data));
        res.write(React.renderComponentToString(App(null, page)));
        res.end(layout.epilogue.replace('DATA', JSON.stringify(data)));
    });
});

module.exports = router;

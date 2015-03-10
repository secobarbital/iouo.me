var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var compression = require('compression');

var cachify = require('./config/cachify');
var jade = require('./config/jade');
var rollbar = require('./config/rollbar');
var publicPath = path.join(__dirname, 'public');
var routes = require('./routes/index');
var legacy = require('./routes/legacy');
var api = require('./routes/api');
var ping = require('./routes/ping');

var app = express();

app.set('x-powered-by', false);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(compression());
app.use(favicon(path.join(__dirname, 'favicons', 'favicon.ico')));
app.use(logger('dev'));
app.use(cachify);
app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname, 'favicons')));

app.use('/api', api);
app.use('/ping', ping);
app.use(legacy);
app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

app.use(rollbar.errorHandlerWithToken);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

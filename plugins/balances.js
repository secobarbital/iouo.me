var through2 = require('through2');
var db = require('../config/db');

exports.register = function(plugin, options, next) {
    plugin.route([
        { method: 'GET', path: '/api/balances', handler: balances },
        { method: 'GET', path: '/api/balances/{ower}', handler: balance },
        { method: 'GET', path: '/api/balances/{ower}/{owee}', handler: transactions }
    ]);

    // pegasus aliases
    plugin.route([
        { method: 'GET', path: '/api/balances/', handler: balances },
        { method: 'GET', path: '/api/balances/balances/{ower}', handler: balance },
        { method: 'GET', path: '/api/balances/transactions/{ower}/{owee}', handler: transactions }
    ]);

    next();
};

exports.register.attributes = {
    name: 'balances',
    version: '1.0.0'
};

var dbHeaderWhitelist = [
    'cache-control',
    'content-type',
    'date',
    'etag',
    'transfer-encoding'
];

function pipefilter(response, dbResponse) {
    Object.keys(dbResponse.headers).filter(function(name) {
        return dbHeaderWhitelist.indexOf(name) > -1;
    }).forEach(function(name) {
        var value = dbResponse.headers[name];
        response.header(name, value);
    });
    response.send();
};

function streamRequest(dbRequest, reply) {
    var response = reply(dbRequest.pipe(through2())).hold();
    dbRequest.pipefilter = pipefilter.bind(null, response);
}

function balances(request, reply) {
    var options = { group_level: 1 };
    streamRequest(db.view('iouome', 'balances', options), reply);
}

function balance(request, reply) {
    var ower = request.params.ower;
    var options = {
        group_level: 2,
        startkey: [ower],
        endkey: [ower, {}]
    };
    streamRequest(db.view('iouome', 'balances', options), reply);
}

function transactions(request, reply) {
    var ower = request.params.ower;
    var owee = request.params.owee;
    var options = {
        descending: true,
        reduce: false,
        startkey: [ower, owee, {}],
        endkey: [ower, owee],
        include_docs: true
    };
    streamRequest(db.view('iouome', 'balances', options), reply);
}

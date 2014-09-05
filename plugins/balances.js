var db = require('./config/db');
var through2 = require('through2');

exports.register = function(plugin, options, next) {
    plugin.route({
        method: 'GET',
        path: '/api/balances',
        handler: balances
    });

    plugin.route({
        method: 'GET',
        path: '/api/balances/{ower}',
        handler: balance
    });

    plugin.route({
        method: 'GET',
        path: '/api/balances/{ower}/{owee}',
        handler: transactions
    });

    next();
};

exports.register.attributes = {
    name: 'balances',
    version: '1.0.0'
};

function balances(request, reply) {
    var options = { group_level: 1 };
    reply(db.view('iouome', 'balances', options).pipe(through2()))
        .header('Cache-Control', 'must-revalidate');
}

function balance(request, reply) {
    var ower = request.params.ower;
    var options = {
        group_level: 2,
        startkey: [ower],
        endkey: [ower, {}]
    };
    reply(db.view('iouome', 'balances', options).pipe(through2()))
        .header('Cache-Control', 'must-revalidate');
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
    reply(db.view('iouome', 'balances', options).pipe(through2()))
        .header('Cache-Control', 'must-revalidate');
}

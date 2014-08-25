var db = require('./config/db');

exports.register = function(plugin, options, next) {
    plugin.route({
        method: 'GET',
        path: '/api/balances',
        handler: list
    });

    plugin.route({
        method: 'GET',
        path: '/api/balances/{ower}',
        handler: get
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

function list(request, reply) {
    var options = { group_level: 1 };
    db.view('iouome', 'balances', options, function(err, res) {
        if (err) {
            return reply(plugin.hapi.error.internal(err));
        }
        reply(res.rows.filter(function(balance) {
            return balance.value !== 0;
        }));
    });
}

function get(request, reply) {
    var ower = request.params.ower;
    var options = {
        group_level: 2,
        startkey: [ower],
        endkey: [ower, {}]
    };
    db.view('iouome', 'balances', options, function(err, res) {
        if (err) {
            return reply(plugin.hapi.error.internal(err));
        }
        reply(res.rows.filter(function(balance) {
            return balance.value !== 0;
        }));
    });
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
    db.view('iouome', 'balances', options, function(err, res) {
        if (err) {
            return reply(plugin.hapi.error.internal(err));
        }
        reply(res.rows);
    });
}

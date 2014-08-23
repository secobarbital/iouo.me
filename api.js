var db = require('./config/db');

exports.balances = function(req, res, next) {
    db.view('iouome', 'balances', { group_level: 1 }, function(err, balances) {
        if (err) {
            return next(err);
        }
        res.send(balances.rows.filter(function(balance) {
            return balance.value !== 0;
        }));
    });
}

exports.balance = function(req, res, next) {
    var ower = req.params.ower;
    db.view('iouome', 'balances', {
        group_level: 2,
        startkey: [ower],
        endkey: [ower, {}]
    }, function(err, balances) {
        if (err) {
            return next(err);
        }
        res.send(balances.rows.filter(function(balance) {
            return balance.value != 0;
        }));
    });
}

exports.transactions = function(req, res, next) {
    var ower = req.params.ower;
    var owee = req.params.owee;
    console.log('transactions for', ower, owee);
    db.view('iouome', 'balances', {
        descending: true,
        reduce: false,
        startkey: [ower, owee, {}],
        endkey: [ower, owee],
        include_docs: true
    }, function(err, transactions) {
        if (err) {
            return next(err);
        }
        res.send(transactions.rows);
    });
}

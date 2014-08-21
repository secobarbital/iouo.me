var db = require('./config/db');

exports.list = function(req, res, next) {
    db.view('iouome', 'balances', { group_level: 1 }, function(err, balances) {
        if (err) {
            return next(err);
        }
        res.send(balances.rows.filter(function(balance) {
            return !!balance.value;
        }).map(function(balance) {
            return { ower: balance.key[0], amount: balance.value };
        }).sort(function(a, b) {
            return b.value - a.value;
        }));
    });
}

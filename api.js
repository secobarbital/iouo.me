var db = require('./config/db');

exports.list = function(req, res, next) {
    db.view('iouome', 'balances', { group_level: 1 }, function(err, balances) {
        if (err) {
            return next(err);
        }
        res.send(balances.rows.filter(function(balance) {
            return balance.value !== 0;
        }));
    });
}

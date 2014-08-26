var Collection = require('ampersand-rest-collection');
var Balance = require('./balance');


module.exports = Collection.extend({
    mainIndex: 'ower',
    model: Balance,
    url: '/api/balances',
    comparator: function(balance) {
        return -balance.amount;
    }
});

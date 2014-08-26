var Collection = require('ampersand-rest-collection');
var Balance = require('./balance');
var outstanding = require('../helpers/outstanding');


module.exports = Collection.extend({
    mainIndex: 'ower',
    model: Balance,
    url: '/api/balances',
    fetched: false,
    comparator: function(balance) {
        return -balance.amount;
    },
    fetchIfNotFetched: function() {
        if (!this.fetched) {
            this.fetched = true;
            this.reset();
            this.fetch();
        }
    },
    parse: function(res) {
        return res.rows.filter(outstanding);
    }
});

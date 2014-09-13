var Collection = require('ampersand-rest-collection');
var Balance = require('./balance');
var outstanding = require('../helpers/outstanding');
var PegasusMixin = require('../helpers/pegasus-mixin.js');


module.exports = Collection.extend(PegasusMixin, {
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
            this.fetch({
                reset: true
            });
        }
    },
    parse: function(res) {
        return res.rows.filter(outstanding);
    }
});

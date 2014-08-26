var Collection = require('ampersand-rest-collection');
var CrossBalance = require('./xbalance');
var outstanding = require('../helpers/outstanding');


module.exports = Collection.extend({
    mainIndex: 'owee',
    model: CrossBalance,
    comparator: function(balance) {
        return -balance.amount;
    },
    url: function() {
        return this.parent && this.parent.url();
    },
    parse: function(res) {
        var xbalances;
        if (xbalances = res.rows) {
            return xbalances.filter(outstanding);
        } else {
            return res;
        }
    }
});

var Collection = require('ampersand-rest-collection');
var CrossBalance = require('./xbalance');


module.exports = Collection.extend({
    mainIndex: 'owee',
    model: CrossBalance,
    comparator: function(balance) {
        return -balance.amount;
    },
    url: function() {
        return this.parent && this.parent.url();
    }
});

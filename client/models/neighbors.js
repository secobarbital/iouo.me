var Collection = require('ampersand-collection');
var CrossBalance = require('./xbalance');


module.exports = Collection.extend({
    mainIndex: 'owee',
    model: CrossBalance,
    comparator: function(balance) {
        return -balance.amount;
    }
});

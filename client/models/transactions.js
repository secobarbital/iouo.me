var Collection = require('ampersand-rest-collection');
var Transaction = require('./transaction');


module.exports = Collection.extend({
    model: Transaction,
    comparator: function(transaction) {
        return -transaction.createdAt;
    },
    url: function() {
        return this.parent && this.parent.url();
    },
    parse: function(res) {
        return res.rows;
    }
});

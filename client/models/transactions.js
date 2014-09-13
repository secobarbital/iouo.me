var Collection = require('ampersand-rest-collection');
var Transaction = require('./transaction');
var PegasusMixin = require('../helpers/pegasus-mixin');


module.exports = Collection.extend(PegasusMixin, {
    model: Transaction,
    comparator: function(transaction) {
        return -transaction.createdAt;
    },
    url: function() {
        return this.parent && this.parent.url();
    },
    pegasusUrl: function() {
        return this.url().replace('/balances/', '/balances/transactions/');
    },
    parse: function(res) {
        return res.rows;
    }
});

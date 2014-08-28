var PageView = require('./base');
var templates = require('../templates');
var BalanceView = require('../views/balance');


module.exports = PageView.extend({
    template: templates.pages.home,
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.collection, BalanceView, this.queryByHook('balances'));
        this.collection.fetchIfNotFetched();
    }
});

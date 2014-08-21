var PageView = require('./base');
var templates = require('../templates');
var BalanceView = require('../views/balance');


module.exports = PageView.extend({
    pageTitle: 'home',
    template: templates.pages.home,
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.collection, BalanceView, this.getByRole('balances'));
        if (!this.collection.length) {
            this.fetchCollection();
        }
    },
    fetchCollection: function() {
        this.collection.fetch();
        return false;
    },
    resetCollection: function() {
        this.collection.reset();
    }
});

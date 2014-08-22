/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');
var XBalanceView = require('../views/xbalance');


module.exports = PageView.extend({
    pageTitle: 'view balance',
    template: templates.pages.balance,
    bindings: {
        'model.ower': '[role=ower]',
        'model.verb': '[role=verb]',
        'model.formattedAmount': '[role=total]',
        'model.oweUrl': {
            type: 'attribute',
            role: 'owe',
            name: 'href'
        }
    },
    initialize: function(spec) {
        app.balances.getOrFetch(spec.id, function(err, model) {
            if (err) alert('did not find a balance for: ' + spec.id);
            this.model = model;
            this.collection = model.owees;
            this.collection.url = model.collection.url + '/' + model.ower;
        }.bind(this));
    },
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.collection, XBalanceView, this.getByRole('balances'));
        if (!this.collection.length) {
            this.fetchCollection();
        }
    },
    fetchCollection: function() {
        this.collection.fetch();
        return false;
    }
});

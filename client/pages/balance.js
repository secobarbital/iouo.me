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
            this.deferredRenderCollection(this.collection);
        }.bind(this));
    },
    render: function() {
        this.renderWithTemplate();
        this.deferredRenderCollection(this.collection, XBalanceView, this.getByRole('balances'));
    },
    deferredRenderCollection: function(collection, view, el) {
        if (arguments.length === 1 && this.renderCollectionDeferred) {
            view = this.renderCollectionDeferred[1];
            el = this.renderCollectionDeferred[2];
        }
        if (collection && view && el) {
            delete this.renderCollectionDeferred;
            this.renderCollection(collection, view, el);
            this.fetchCollectionIfEmpty();
        } else {
            this.renderCollectionDeferred = arguments;
        }
    },
    fetchCollectionIfEmpty: function() {
        if (this.collection.isEmpty()) {
            this.collection.fetch();
        }
    }
});

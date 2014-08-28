/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');
var XBalanceView = require('../views/xbalance');


module.exports = PageView.extend({
    template: templates.pages.balance,
    bindings: {
        'model.ower': '[data-hook=ower]',
        'model.verb': '[data-hook=verb]',
        'model.formattedAmount': '[data-hook=total]',
        'model.oweUrl': {
            type: 'attribute',
            hook: 'owe',
            name: 'href'
        }
    },
    initialize: function(spec) {
        this.pageTitle = 'Balances for @' + spec.ower;
        app.balances.getOrFetch(spec.ower, function(err, model) {
            if (err) {
                return alert('did not find a balance for: ' + spec.ower);
            }
            this.model = model;
            this.collection = model.owees;
            this.deferredRenderCollection(this.collection);
        }.bind(this));
    },
    render: function() {
        this.renderWithTemplate();
        this.deferredRenderCollection(this.collection, XBalanceView, this.queryByHook('balances'));
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

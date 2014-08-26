/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');
var TransactionView = require('../views/transaction');


module.exports = PageView.extend({
    pageTitle: 'transactions',
    template: templates.pages.transactions,
    bindings: {
        'model.owee': '[role=owee]',
        'model.subject': '[role=subject]',
        'model.subjectUrl': {
            type: 'attribute',
            role: 'subjectLink',
            name: 'href'
        },
        'model.object': '[role=object]',
        'model.objectUrl': {
            type: 'attribute',
            role: 'objectLink',
            name: 'href'
        },
        'model.formattedAmount': '[role=total]',
        'model.oweUrl': {
            type: 'attribute',
            role: 'owe',
            name: 'href'
        }
    },
    initialize: function(spec) {
        app.balances.getOrFetch(spec.ower, function(err, balance) {
            if (err) {
                return alert('Did not find a balance for: ' + spec.ower);
            }
            balance.owees.getOrFetch(spec.owee, function(err, model) {
                this.model = model;
                this.collection = model.transactions;
                this.deferredRenderCollection(this.collection);
            }.bind(this));
        }.bind(this));
    },
    render: function() {
        this.renderWithTemplate();
        this.deferredRenderCollection(this.collection, TransactionView, this.getByRole('transactions'));
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

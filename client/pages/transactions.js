/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');
var TransactionView = require('../views/transaction');


module.exports = PageView.extend({
    template: templates.pages.transactions,
    bindings: {
        'model.owee': '[data-hook=owee]',
        'model.subject': '[data-hook=subject]',
        'model.subjectUrl': {
            type: 'attribute',
            hook: 'subjectLink',
            name: 'href'
        },
        'model.object': '[data-hook=object]',
        'model.objectUrl': {
            type: 'attribute',
            hook: 'objectLink',
            name: 'href'
        },
        'model.formattedAmount': '[data-hook=total]',
        'model.oweUrl': {
            type: 'attribute',
            hook: 'owe',
            name: 'href'
        }
    },
    initialize: function(spec) {
        this.pageTitle = 'Transactions between @' + spec.ower + ' and @' + spec.owee;
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
        this.deferredRenderCollection(this.collection, TransactionView, this.queryByHook('transactions'));
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

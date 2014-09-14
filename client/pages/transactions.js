/*global app, alert*/
var CollectionView = require('ampersand-collection-view');
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
    subviews: {
        transactions: {
            hook: 'transactions',
            waitFor: 'collection',
            prepareView: function(el) {
                if (this.collection.isEmpty()) {
                    this.collection.fetch();
                }
                return new CollectionView({
                    el: el,
                    collection: this.collection,
                    view: TransactionView
                });
            }
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
            }.bind(this));
        }.bind(this));
    }
});

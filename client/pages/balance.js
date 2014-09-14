/*global app, alert*/
var CollectionView = require('ampersand-collection-view');
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
        },
        'model.rouletteUrl': {
            type: 'attribute',
            hook: 'roulette',
            name: 'href'
        }
    },
    subviews: {
        owees: {
            hook: 'balances',
            waitFor: 'collection',
            prepareView: function(el) {
                if (this.collection.isEmpty()) {
                    this.collection.fetch();
                }
                return new CollectionView({
                    el: el,
                    collection: this.collection,
                    view: XBalanceView
                });
            }
        }
    },
    initialize: function(spec) {
        this.pageTitle = 'Balances for @' + spec.ower;
        app.balances.getOrFetch(spec.ower, function(err, model) {
            if (err) {
                return alert('Did not find a balance for: ' + spec.ower);
            }
            this.model = model;
            this.collection = model.owees;
        }.bind(this));
    }
});

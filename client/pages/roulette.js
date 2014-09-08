var PageView = require('./base');
var templates = require('../templates');
var Roulette = require('../models/roulette');
var XBalanceView = require('../views/xbalance');


module.exports = PageView.extend({
    template: templates.pages.roulette,
    bindings: {
        'model.headline': '[data-hook=headline]',
        'model.prefixVerb': '[data-hook=heading-prefix-verb]',
        'model.suffixVerb': '[data-hook=heading-suffix-verb]',
        'model.user': '[data-hook=heading-user]',
        'model.formattedAmount': '[data-hook=heading-amount]',
        'model.geoErrorMessage': '[data-hook=geo-error-message]',
        'model.postErrorMessage': '[data-hook=post-error-message]',
        'model.balanceUrl': {
            type: 'attribute',
            hook: 'heading-balance-url',
            name: 'href'
        },
        'model.amount': {
            type: 'toggle',
            hook: 'heading-amount-container'
        },
        'model.featuresMissing': {
            type: 'toggle',
            hook: 'features-missing'
        },
        'model.geoPermissionDenied': {
            type: 'toggle',
            hook: 'geo-permission-denied'
        },
        'model.geoPositionUnavailable': {
            type: 'toggle',
            hook: 'geo-position-unavailable'
        },
        'model.geoTimeout': {
            type: 'toggle',
            hook: 'geo-timeout'
        },
        'model.geoError': {
            type: 'toggle',
            hook: 'geo-error'
        },
        'model.postError': {
            type: 'toggle',
            hook: 'post-error'
        },
        'model.empty': {
            type: 'toggle',
            hook: 'no-neighbors'
        }
    },
    events: {
        'click [data-hook=retry]': 'retryGeo'
    },
    initialize: function(spec) {
        this.pageTitle = 'IOU Roulette with @' + spec.user;
        this.model = new Roulette({
            user: spec.user
        });
        this.collection = this.model.neighbors;
        this.on('remove', this.model.stopListeningForNeighbors.bind(this.model));
    },
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.collection, XBalanceView, this.queryByHook('neighbors'));
    },
    retryGeo: function(e) {
        e.preventDefault();
        this.model.retryGeo();
    }
});

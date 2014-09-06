var _ = require('underscore');
var accounting = require('accounting');
var AmpersandModel = require('ampersand-model');
var Promise = require('promise');
var xhr = require('xhr');
var Balance = require('./balance');
var Neighbors = require('./neighbors');


module.exports = AmpersandModel.extend({
    props: {
        user: 'string',
        featuresMissing: 'boolean',
        geoPermissionDenied: 'boolean',
        geoPositionUnavailable: 'boolean',
        geoTimeout: 'boolean',
        geoErrorMessage: 'string',
        postErrorMessage: 'string',
        neighborsUpdatedAt: 'number'
    },
    derived: {
        amount: {
            deps: ['neighborsUpdatedAt'],
            fn: function() {
                return this.neighbors.reduce(function(sum, neighbor) {
                    return sum + neighbor.amount;
                }, 0);
            }
        },
        headline: {
            deps: ['amount'],
            fn: function() {
                return accounting.formatMoney(-this.amount, '');
            }
        },
        prefixVerb: {
            deps: ['amount'],
            fn: function() {
                if (this.amount < 0) {
                    return 'The group owes';
                } else {
                    return '';
                }
            }
        },
        suffixVerb: {
            deps: ['amount'],
            fn: function() {
                if (this.amount > 0) {
                    return 'owes the group';
                } else if (this.amount === 0) {
                    return 'is even with the group';
                }
            }
        },
        formattedAmount: {
            deps: ['amount'],
            fn: function() {
                return accounting.formatMoney(Math.abs(this.amount), '');
            }
        },
        balanceUrl: {
            deps: ['user'],
            fn: function() {
                return '/balances/' + this.user;
            }
        },
        empty: {
            deps: ['neighborsUpdatedAt'],
            fn: function() {
                return this.neighbors.length === 0;
            }
        },
        geoError: {
            deps: ['geoErrorMessage'],
            fn: function() {
                return !!this.geoErrorMessage;
            }
        },
        postError: {
            deps: ['postErrorMessage'],
            fn: function() {
                return !!this.postErrorMessage;
            }
        }
    },
    collections: {
        neighbors: Neighbors
    },
    initialize: function() {
        var getOrFetchBalance = Promise.denodeify(app.balances.getOrFetch.bind(app.balances));
        this.balancePromise = getOrFetchBalance(this.user);
        this.neighbors.on('all', function() {
            this.neighborsUpdatedAt = Date.now();
        }.bind(this));

        if (('geolocation' in navigator) && ('EventSource' in window)) {
            this.listenForNeighbors();
            this.enableGeo();
        } else {
            this.featuresMissing = true;
        }
    },
    retryGeo: function() {
        this.geoPermissionDenied = false;
        this.geoPositionUnavailable = false;
        this.geoTimeout = false;
        this.geoErrorMessage = null;
        this.postErrorMessage = null;
        location.reload();
    },
    listenForNeighbors: function() {
        var source = new EventSource(location.pathname + '/nearby');
        source.addEventListener('message', function(e) {
            console.log('message', e.data);
            var data = JSON.parse(e.data);
            this.handleNeighbors(data.neighbors);
        }.bind(this), false);
    },
    handleNeighbors: function(neighbors) {
        this.balancePromise.then(function(balance) {
            console.log('handleNeighbors', neighbors, balance);
            var xbalances = neighbors.map(function(neighbor) {
                return balance.owees.get(neighbor) || new CrossBalance({
                    amount: 0,
                    ower: this.user,
                    owee: neighbor
                }.bind(this));
            }, this);
            this.neighbors.set(xbalances);
        }.bind(this));
    },
    handleGeo: function(position) {
        xhr({
            method: 'POST',
            uri: location.pathname,
            json: {
                position: position
            }
        }, function(err, resp, body) {
            if (err) {
                this.postErrorMessage = err;
            }
        }.bind(this));
    },
    handleGeoError: function(err) {
        switch (err.code) {
            case 1:
                this.permissionDenied = true;
            break;
            case 2:
                this.geoPositionUnavailable = true;
            break;
            case 3:
                this.geoTimeout = true;
            break;
            default:
                this.geoErrorMessage = err.message;
            break;
        }
    },
    enableGeo: function() {
        navigator.geolocation.getCurrentPosition(this.handleGeo, this.handleGeoError, {
            enableHighAccuracy: true,
            timeout: 5000
        });
    }
});

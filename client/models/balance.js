var AmpersandModel = require('ampersand-model');
var accounting = require('accounting');

var CrossBalances = require('./xbalances');

module.exports = AmpersandModel.extend({
    idAttribute: 'ower',
    props: {
        ower: 'string',
        amount: 'number'
    },
    derived: {
        verb: {
            deps: ['amount'],
            fn: function() {
                return this.amount > 0 ? 'owes' : 'is owed';
            }
        },
        formattedAmount: {
            deps: ['amount'],
            fn: function() {
                return accounting.formatMoney(Math.abs(this.amount), '');
            }
        },
        url: {
            deps: ['ower'],
            fn: function() {
                return '/balances/' + this.ower;
            }
        },
        oweUrl: {
            deps: ['ower'],
            fn: function() {
                return 'https://twitter.com/intent/tweet?text=@' + encodeURIComponent(this.ower + ' #iou $');
            }
        }
    },
    collections: {
        owees: CrossBalances
    },
    parse: function(attrs) {
        return {
            ower: attrs.key[0],
            amount: attrs.value
        };
    }
});

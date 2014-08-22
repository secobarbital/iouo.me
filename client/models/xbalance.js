var AmpersandModel = require('ampersand-model');
var accounting = require('accounting');


module.exports = AmpersandModel.extend({
    idAttribute: 'owee',
    props: {
        ower: 'string',
        owee: 'string',
        amount: 'number'
    },
    derived: {
        formattedAmount: {
            deps: ['amount'],
            fn: function() {
                return accounting.formatMoney(Math.abs(this.amount), '');
            }
        },
        prefixVerb: {
            deps: ['amount'],
            fn: function() {
                return this.amount > 0 ? 'owes' : '';
            }
        },
        suffixVerb: {
            deps: ['amount'],
            fn: function() {
                return this.amount < 0 ? 'owes' : '';
            }
        },
        url: {
            deps: ['ower', 'owee'],
            fn: function() {
                return '/balances/' + this.ower + '/' + this.owee;
            }
        }
    },
    parse: function(attrs) {
        return {
            ower: attrs.key[0],
            owee: attrs.key[1],
            amount: attrs.value
        };
    }
});

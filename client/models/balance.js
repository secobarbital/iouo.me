var AmpersandModel = require('ampersand-model');
var accounting = require('accounting');


module.exports = AmpersandModel.extend({
    props: {
        ower: 'string',
        amount: 'number',
    },
    derived: {
        subject: {
            deps: ['ower'],
            fn: function() {
                return '@' + this.ower;
            }
        },
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
        }
    }
});

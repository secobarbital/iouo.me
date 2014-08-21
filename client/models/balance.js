var AmpersandModel = require('ampersand-model');


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
        url: {
            deps: ['ower'],
            fn: function() {
                return '/balances/' + this.ower;
            }
        }
    }
});

var AmpersandModel = require('ampersand-model');
var accounting = require('accounting');
var Transactions = require('./transactions');


module.exports = AmpersandModel.extend({
    idAttribute: 'owee',
    props: {
        ower: 'string',
        owee: 'string',
        amount: 'number'
    },
    collections: {
        transactions: Transactions
    },
    derived: {
        formattedAmount: {
            deps: ['amount'],
            fn: function() {
                return accounting.formatMoney(Math.abs(this.amount), '');
            }
        },
        subject: {
            deps: ['ower', 'owee', 'amount'],
            fn: function() {
                return this.amount >= 0 ? this.ower : this.owee;
            }
        },
        subjectUrl: {
            deps: ['subject'],
            fn: function() {
                return '/balances/' + this.subject;
            }
        },
        object: {
            deps: ['ower', 'owee', 'amount'],
            fn: function() {
                return this.amount < 0 ? this.ower : this.owee;
            }
        },
        objectUrl: {
            deps: ['object'],
            fn: function() {
                return '/balances/' + this.object;
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
        ledgerUrl: {
            deps: ['ower', 'owee'],
            fn: function() {
                return '/transactions/' + this.ower + '/' + this.owee;
            }
        }
    },
    parse: function(res) {
        var transactions;
        if (transactions = res.rows) {
            return {
                ower: transactions[0].key[0],
                owee: transactions[0].key[1],
                transactions: transactions,
                amount: transactions.reduce(function(sum, transaction) {
                    return sum + transaction.value;
                }, 0) 
            };
        } else {
            return {
                ower: res.key[0],
                owee: res.key[1],
                amount: res.value
            };
        }
    }
});

/*global me, app*/
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var BalancePage = require('./pages/balance');
var TransactionsPage = require('./pages/transactions');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'balances/:ower': 'balance',
        'transactions/:ower/:owee': 'transactions',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function() {
        this.trigger('page', new HomePage({
            collection: app.balances
        }));
    },

    balance: function(ower) {
        this.trigger('page', new BalancePage({
            ower: ower
        }));
    },

    transactions: function(ower, owee) {
        this.trigger('page', new TransactionsPage({
            ower: ower,
            owee: owee
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});

/*global me, app*/
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var BalancePage = require('./pages/balance');
var TransactionsPage = require('./pages/transactions');
var RoulettePage = require('./pages/roulette');
var OwePage = require('./pages/owe');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'owe': 'owe',
        'balances/:ower': 'balance',
        'transactions/:ower/:owee': 'transactions',
        'roulette/:user': 'roulette',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function() {
        this.trigger('page', new HomePage({
            collection: app.balances
        }));
    },

    owe: function() {
        this.trigger('page', new OwePage());
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

    roulette: function(user) {
        this.trigger('page', new RoulettePage({
            user: user
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});

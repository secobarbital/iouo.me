var Collection = require('ampersand-rest-collection');
var Balance = require('./balance');


module.exports = Collection.extend({
    model: Balance,
    url: '/api/balances'
});

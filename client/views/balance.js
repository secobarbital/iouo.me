var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.balance,
    bindings: {
        'model.ower': '[data-hook=subject]',
        'model.verb': '[data-hook=verb]',
        'model.formattedAmount': '[data-hook=amount]',
        'model.balanceUrl': {
            type: 'attribute',
            hook: 'balance',
            name: 'href'
        }
    }
});

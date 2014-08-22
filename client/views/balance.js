var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.balance,
    bindings: {
        'model.ower': '[role=subject]',
        'model.verb': '[role=verb]',
        'model.formattedAmount': '[role=amount]',
        'model.balanceUrl': {
            type: 'attribute',
            role: 'balance',
            name: 'href'
        }
    }
});

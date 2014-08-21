var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.balance,
    bindings: {
        'model.subject': '[role=subject]',
        'model.verb': '[role=verb]',
        'model.amount': '[role=amount]',
        'model.url': {
            type: 'attribute',
            role: 'balance',
            name: 'href'
        }
    },
});

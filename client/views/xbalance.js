var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.xbalance,
    bindings: {
        'model.owee': '[data-hook=subject]',
        'model.prefixVerb': '[data-hook=prefixVerb]',
        'model.suffixVerb': '[data-hook=suffixVerb]',
        'model.formattedAmount': '[data-hook=amount]',
        'model.ledgerUrl': {
            type: 'attribute',
            hook: 'balance',
            name: 'href'
        }
    }
});

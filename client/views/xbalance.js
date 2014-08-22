var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.xbalance,
    bindings: {
        'model.owee': '[role=subject]',
        'model.prefixVerb': '[role=prefixVerb]',
        'model.suffixVerb': '[role=suffixVerb]',
        'model.formattedAmount': '[role=amount]',
        'model.url': {
            type: 'attribute',
            role: 'balance',
            name: 'href'
        }
    }
});

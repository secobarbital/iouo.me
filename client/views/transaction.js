var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.transaction,
    bindings: {
        'model.ower': '[data-hook=ower]',
        'model.text': '[data-hook=text]',
        'model.prettyDate': '[data-hook=timestamp]',
        'model.isoTime': {
            type: 'attribute',
            hook: 'timestamp',
            name: 'datetime'
        },
        'model.ltr': [
            {
                type: 'booleanClass',
                hook: 'image',
                yes: 'pull-left',
                no: 'pull-right'
            },
            {
                type: 'booleanClass',
                hook: 'body',
                yes: 'text-left',
                no: 'text-right'
            }
        ],
        'model.externalUrl': {
            type: 'attribute',
            hook: 'transaction',
            name: 'href'
        },
        'model.profileImageUrl': {
            type: 'attribute',
            hook: 'image',
            name: 'src'
        }
    }
});

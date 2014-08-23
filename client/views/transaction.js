var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.transaction,
    bindings: {
        'model.ower': '[role=ower]',
        'model.text': '[role=text]',
        'model.prettyDate': '[role=timestamp]',
        'model.isoTime': {
            type: 'attribute',
            role: 'timestamp',
            name: 'datetime'
        },
        'model.ltr': [
            {
                type: 'booleanClass',
                role: 'image',
                yes: 'pull-left',
                no: 'pull-right'
            },
            {
                type: 'booleanClass',
                role: 'body',
                yes: 'text-left',
                no: 'text-right'
            }
        ],
        'model.externalUrl': {
            type: 'attribute',
            role: 'transaction',
            name: 'href'
        },
        'model.profileImageUrl': {
            type: 'attribute',
            role: 'image',
            name: 'src'
        }
    }
});

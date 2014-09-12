var _ = require('underscore');
var InputView = require('ampersand-input-view');
var templates = require('../templates');

var InputGroup = module.exports = InputView.extend({
    template: templates.includes.inputGroup(),
    props: {
        'id': 'string',
        'prefix': 'string',
        'step': 'string'
    },
    bindings: _.extend({
        'id': [
            {
                type: 'attribute',
                name: 'for',
                hook: 'label'
            },
            {
                type: 'attribute',
                name: 'id',
                selector: 'input'
            }
        ],
        'prefix': '[data-hook=prefix]',
        'step': {
            type: 'attribute',
            name: 'step',
            selector: 'input'
        }
    }, InputView.prototype.bindings)
});

delete InputGroup.prototype.bindings.name;

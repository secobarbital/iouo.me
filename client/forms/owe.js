var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var InputGroup = require('./input-group');
var templates = require('../templates');
var BareInput = InputView.extend({
    template: '<input>'
});


module.exports = FormView.extend({
    fields: function() {
        return [
            new InputGroup({
                id: 'oweScreenName',
                name: 'owee',
                label: 'Twitter Screen Name',
                prefix: '@',
                required: true,
                parent: this,
                tests: [
                    function(val) {
                        if (/\s/.test(val)) {
                            return 'Must be a valid twitter screen name';
                        }
                    }
                ]
            }),
            new InputGroup({
                id: 'oweAmount',
                name: 'amount',
                label: 'Amount',
                prefix: '$',
                type: 'number',
                step: 'any',
                required: true,
                parent: this,
                tests: [
                    function(val) {
                        if (val <= 0) {
                            return 'Must be positive';
                        }
                    },
                    function(val) {
                        if (!/^[.0-9]+$/.test(val)) {
                            return 'Must be a number';
                        }
                    }
                ]
            }),
            new BareInput({
                name: 'text',
                type: 'hidden',
                required: true,
                parent: this
            })
        ];
    },
    beforeSubmit: function() {
        FormView.prototype.beforeSubmit.apply(this);
        this.model.set(this.getData());
        this.getField('text').setValue(this.model.text);
    }
});

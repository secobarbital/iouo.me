var PageView = require('./base');
var templates = require('../templates');
var OweForm = require('../forms/owe');
var Owe = require('../models/owe');


module.exports = PageView.extend({
    pageTitle: 'Owe Someone',
    template: templates.pages.owe,
    initialize: function() {
        this.model = new Owe();
    },
    subviews: {
        form: {
            container: 'form',
            prepareView: function(el) {
                return new OweForm({
                    el: el,
                    model: this.model,
                    preventDefault: false
                });
            }
        }
    }
});

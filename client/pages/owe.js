var PageView = require('./base');
var templates = require('../templates');
var OweForm = require('../forms/owe');


module.exports = PageView.extend({
    pageTitle: 'Owe Someone',
    template: templates.pages.owe,
    subviews: {
        form: {
            container: 'form',
            prepareView: function(el) {
                return new OweForm({
                    el: el,
                    preventDefault: false
                });
            }
        }
    }
});

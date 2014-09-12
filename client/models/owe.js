var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        owee: 'string',
        amount: 'number'
    },
    derived: {
        text: {
            deps: ['owee', 'amount'],
            fn: function() {
                return '@' + this.owee + ' #iou $' + this.amount;
            }
        }
    }
});

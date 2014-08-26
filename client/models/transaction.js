var AmpersandModel = require('ampersand-model');
var prettyDate = require('../helpers/timeago');


module.exports = AmpersandModel.extend({
    props: {
        id: 'string',
        ower: 'string',
        owee: 'string',
        owerId: 'string',
        amount: 'number',
        text: 'string',
        createdAt: 'date',
        profileImageUrl: 'string'
    },
    derived: {
        externalUrl: {
            deps: ['namespace', 'id', 'owerId'],
            fn: function() {
                if (this.namespace === 'twitter') {
                    return 'http://twitter.com/' + this.owerId + '/status/' + id;
                }
            }
        },
        isoTime: {
            deps: ['createdAt'],
            fn: function() {
                return this.createdAt.toISOString();
            }
        },
        prettyDate: {
            deps: ['createdAt'],
            fn: function() {
                return prettyDate(new Date().getTime() - this.createdAt.getTime());
            }
        },
        ltr: {
            deps: ['collection.parent.owee', 'amount', 'ower'],
            fn: function() {
                return this.ower === this.collection.parent.owee ^ this.amount > 0;
            }
        }
    },
    parse: function(attrs) {
        return {
            id: attrs.id,
            ower: attrs.key[0],
            owee: attrs.key[1],
            amount: attrs.value,
            owerId: attrs.doc.raw.user.id_str,
            text: attrs.doc.raw.text,
            createdAt: new Date(attrs.doc.raw.created_at),
            profileImageUrl: attrs.doc.raw.user.profile_image_url
        };
    }
});

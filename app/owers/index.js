var Cycle = require('cyclejs');
var h = Cycle.h;
var Rx = Cycle.Rx;
var page = require('../page');
var xhr = require('../xhr');

function vrenderOwers(owers) {
    return owers
        .map(function(ower) {
            return h('li',
                     h('a', { href: '/' + ower.ower },
                       ower.ower + ' owes ' + ower.amount));
        });
}

var OwersModel = Cycle.createModel(['changeRoute$'], function(intent) {
    return {
        owers$: intent.changeRoute$
            .map(function(route) {
                return '/api';
            })
            .flatMap(xhr.jsonSource)
            .map(function(body) {
                return body.rows
                    .filter(function(row) {
                        return row.value !== 0;
                    })
                    .sort(function(a, b) {
                        return b.value - a.value;
                    })
                    .map(function(row) {
                        return {
                            ower: row.key[0],
                            amount: row.value
                        };
                    });
            })
    };
});

var OwersView = Cycle.createView(['owers$'], function(model) {
    return {
        events: [],
        vtree$: model.owers$
            .map(function(owers) {
                return h('#owers.page',
                    h('ul', vrenderOwers(owers))
                );
            })
    };
});

var OwersIntent = Cycle.createIntent([], ['owersRoute$'], function(view, route) {
    return {
        changeRoute$: route.owersRoute$
    };
});

exports.Model = OwersModel;
exports.View = OwersView;
exports.Intent = OwersIntent;

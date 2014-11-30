var Cycle = require('cyclejs');
var h = Cycle.h;
var Rx = Cycle.Rx;
var page = require('../page');
var xhr = require('../xhr');

function vrenderOwees(owees) {
    return owees
        .map(function(owee) {
            return h('li',
                     h('a', { href: '/' + owee.name },
                       owee.ower + ' owes ' + owee.owee + owee.amount));
        })
}

var OweesModel = Cycle.createModel(['changeRoute$'], function(intent) {
    return {
        owees$: intent.changeRoute$
            .map(function(route) {
                return '/api' + route.ctx.pathname
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
                            owee: row.key[1],
                            amount: row.value
                        };
                    });
            })
    };
});

var OweesView = Cycle.createView(['owees$'], function(model) {
    return {
        events: [],
        vtree$: model.owees$
            .map(function(owees) {
                return h('div.page#owees',
                    h('ul', vrenderOwees(owees))
                );
            })
    };
});

var OweesIntent = Cycle.createIntent([], function(view) {
    return {
        changeRoute$: page.namedPageSource('owees', '/:ower')
    };
});

exports.Model = OweesModel;
exports.View = OweesView;
exports.Intent = OweesIntent;

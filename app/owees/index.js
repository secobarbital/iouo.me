var Cycle = require('cyclejs');
var h = Cycle.h;
var Rx = Cycle.Rx;
var page = require('../page');
var xhr = require('../xhr');

function vrenderOwees(owees) {
    return owees
        .map(function(owee) {
            return h('li',
                     h('a', { href: [, owee.ower, owee.owee].join('/') },
                       owee.ower + ' owes ' + owee.owee + ' ' + owee.amount));
        })
}

var OweesModel = Cycle.createModel(['oweesRoute$'], function(routeModel) {
    return {
        owees$: routeModel.oweesRoute$
            .map(function(ctx) {
                return '/api' + ctx.pathname
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

exports.Model = OweesModel;
exports.View = OweesView;

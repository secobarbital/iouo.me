var Cycle = require('cyclejs');
var page = require('../page');
var Rx = Cycle.Rx;

var Route = Cycle.createDataFlowNode(['vtree$'], ['vtree$'], function(owersView, oweesView) {
    var owersRoute$ = page.routeSource('/', owersView);
    var oweesRoute$ = page.routeSource('/:ower', oweesView);

    return {
        owersRoute$: owersRoute$,
        oweesRoute$: oweesRoute$,
        vtree$: Rx.Observable
            .merge(
                owersRoute$,
                oweesRoute$
            )
            .flatMap(function(route) {
                return route.view.vtree$;
            })
    };
});

module.exports = Route;

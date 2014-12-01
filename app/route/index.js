var Cycle = require('cyclejs');
var page = require('../page');
var Rx = Cycle.Rx;

var RouteModel = Cycle.createModel(function() {
    return {
        owersRoute$: page.pageSource('/'),
        oweesRoute$: page.pageSource('/:ower'),
        txnsRoute$: page.pageSource('/:ower/:owee')
    };
});

var RouteView = Cycle.createView(
    ['owersRoute$', 'oweesRoute$', 'txnsRoute$'],
    ['vtree$'], ['vtree$'], ['vtree$'],
    function(model, owersView, oweesView, txnsView) {
        var owersRouteView$ = routeView(model.owersRoute$, owersView);
        var oweesRouteView$ = routeView(model.oweesRoute$, oweesView);
        var txnsRouteView$ = routeView(model.txnsRoute$, txnsView);

        return {
            events: [],
            vtree$: Rx.Observable
                .merge(
                    owersRouteView$,
                    oweesRouteView$,
                    txnsRouteView$
                )
                .map(function(route) {
                    return route.view.vtree$;
                })
                .switch()
        };
});

function routeView(route$, view) {
    return Rx.Observable
        .just(view)
        .combineLatest(route$, function(view, ctx) {
            return {
                ctx: ctx,
                view: view
            };
        })
}

exports.Model = RouteModel;
exports.View = RouteView;

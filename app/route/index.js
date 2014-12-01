var Cycle = require('cyclejs');
var page = require('../page');
var Rx = Cycle.Rx;

var RouteModel = Cycle.createModel(function() {
    return {
        owersRoute$: page.pageSource('/'),
        oweesRoute$: page.pageSource('/:ower')
    };
});

var RouteView = Cycle.createView(
    ['owersRoute$', 'oweesRoute$'], ['vtree$'], ['vtree$'],
    function(model, owersView, oweesView) {
        var owersRouteView$ = routeView(model.owersRoute$, owersView);
        var oweesRouteView$ = routeView(model.oweesRoute$, oweesView);

        return {
            events: [],
            vtree$: Rx.Observable
                .merge(owersRouteView$, oweesRouteView$)
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

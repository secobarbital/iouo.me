var Cycle = require('cyclejs');
var Rx = Cycle.Rx;

var RouteModel = Cycle.createModel(['changeRoute$'], function(intent) {
    return {
        route$: intent.changeRoute$
    };
});

var RouteView = Cycle.createView(['route$'], ['vtree$'], ['vtree$'], function(model, owersView, oweesView) {
    var views = {
        owers: owersView,
        owees: oweesView
    };

    return {
        events: [],
        vtree$: model.route$
            .flatMap(function(route) {
                return views[route.name].vtree$;
            }),
    };
});

var RouteIntent = Cycle.createIntent([], ['route$'], ['route$'], function(view, owersIntent, oweesIntent) {
    return {
        changeRoute$: Rx.Observable.merge(owersIntent.route$, oweesIntent.route$)
    };
});

exports.Model = RouteModel;
exports.View = RouteView;
exports.Intent = RouteIntent;

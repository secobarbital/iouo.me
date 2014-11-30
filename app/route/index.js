var Cycle = require('cyclejs');
var page = require('../page');
var Rx = Cycle.Rx;

var Route = Cycle.createDataFlowNode(['vtree$'], ['vtree$'], function(owersView, oweesView) {
    var views = {
        owers: owersView,
        owees: oweesView
    };

    return {
        vtree$: Rx.Observable
            .merge(
                page.namedPageSource('owers', '/'),
                page.namedPageSource('owees', '/:ower')
            )
            .flatMap(function(route) {
                return views[route.name].vtree$;
            })
    };
});

module.exports = Route;

var Cycle = require('cyclejs');
var xhr = require('xhr');
var style = require('./style.styl');
var h = Cycle.h;
var Rx = Cycle.Rx;
var xhrSource = Rx.Observable.fromNodeCallback(xhr, null, function(args) {
    return args[1].rows;
});

function jsonSource(url) {
    return xhrSource({
        url: url,
        json: true
    });
}

var OwersModel = Cycle.createModel(['fetch$'], function(intent) {
    return {
        owers$: intent.fetch$
            .flatMap(jsonSource)
            .map(function(rows) {
                return rows.map(function(row) {
                    return {
                        name: row.key,
                        amount: row.value
                    };
                });
            })
    };
});

function vrenderOwers(owers) {
    return owers
        .map(function(ower) {
            return h('li', ower.name + ' owes ' + ower.amount);
        })
}

var OwersView = Cycle.createView(['owers$'], function(model) {
    return {
        events: [],
        vtree$: model.owers$
            .map(function(owers) {
                return h('div.page#owers',
                    h('ul', vrenderOwers(owers))
                );
            })
    };
});

var OwersIntent = Cycle.createIntent([], function(view) {
    return {
        fetch$: Rx.Observable.just('/api')
    };
});

var RouteModel = Cycle.createModel([], function(intent) {
    return {
        route$: Rx.Observable.just('/')
    };
});

var RouteView = Cycle.createView(['route$'], ['vtree$'], function(model, owersView) {
    return {
        events: [],
        vtree$: owersView.vtree$
    };
});

var RouteIntent = Cycle.createIntent([], function(view) {
    return {
    };
});

Cycle.createRenderer('#app').inject(RouteView);
Cycle.circularInject(OwersModel, OwersView, OwersIntent);
RouteIntent.inject(RouteView);
RouteView.inject(RouteModel, OwersView);
RouteModel.inject(RouteIntent);

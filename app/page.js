var Rx = require('cyclejs').Rx;
var page = require('page');

var pageSource = Rx.Observable.fromCallback(page, null, function(args) {
    return args[0];
});

var routeSource = function(path, view) {
    return pageSource(path)
        .map(function(ctx) {
            return {
                ctx: ctx,
                view: view
            };
        });
};

page.routeSource = routeSource;
module.exports = page;

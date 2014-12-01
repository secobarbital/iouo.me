var Rx = require('cyclejs').Rx;
var page = require('page');

var pageSource = function(path) {
    return Rx.Observable.fromEventPattern(
        function addHandler(h) {
            page(path, h);
        }
    );
};

var routeSource = function(path, view) {
    return pageSource(path)
        .map(function(ctx) {
            return {
                ctx: ctx,
                view: view
            };
        });
};

page.pageSource = pageSource;
page.routeSource = routeSource;
module.exports = page;

var Rx = require('cyclejs').Rx;
var page = require('page');

var pageSource = Rx.Observable.fromCallback(page, null, function(args) {
    return args[0];
});

var namedPageSource = function(name, path) {
    return Rx.Observable.just(name)
        .combineLatest(pageSource(path), function(name, ctx) {
            return {
                ctx: ctx,
                name: name
            };
        });
};

page.namedPageSource = namedPageSource;
module.exports = page;

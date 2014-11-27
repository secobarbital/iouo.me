var Rx = require('cyclejs').Rx;
var xhr = require('xhr');

var xhrSource = Rx.Observable.fromNodeCallback(xhr, null, function(args) {
    return args[1];
});

var jsonSource = function(url) {
    return xhrSource({
        url: url,
        json: true
    });
};

xhr.jsonSource = jsonSource;
module.exports = xhr;

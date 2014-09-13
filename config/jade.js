var _ = require('underscore');
var jade = module.exports = require('jade');

var compile = jade.compile;
jade.compile = function(source, options) {
    var template = compile.apply(this, arguments);
    return function(locals) {
        var args = Array.prototype.slice.call(arguments);
        args[0] = _.extend({
            env: process.env
        }, args[0]);
        return template.apply(this, args);
    };
}

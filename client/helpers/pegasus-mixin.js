var _ = require('underscore');
var sync = require('ampersand-sync');

module.exports = {
    sync: function(method, model, options) {
        if (window.pegasus && method === 'read' && options.success) {
            var url = options.url || _.result(model, 'pegasusUrl') || _.result(model, 'url');
            if (url === pegasus.url.replace(/\/$/, '')) {
                return pegasus.request.then(function(data, xhr) {
                    window.pegasus = null;
                    return options.success(data, 'success', xhr);
                }, function(data, xhr) {
                    if (options.error) {
                        window.pegasus = null;
                        return options.error(xhr, 'error', data);
                    }
                });
            }
        }
        return sync.apply(this, arguments);
    }
};

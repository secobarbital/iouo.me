var path = require('path');

exports.register = function(plugin, options, next) {
    plugin.path(path.join(__dirname, 'public'));

    plugin.route({
        method: 'GET',
        path: '/favicon.ico',
        handler: {
            file: './favicons/favicon.ico'
        }
    });

    plugin.route({
        method: 'GET',
        path: '/favicons/{file}',
        handler: {
            directory: {
                path: './favicons'
            }
        }
    });

    plugin.route({
        method: 'GET',
        path: '/fonts/{file}',
        handler: {
            directory: {
                path: './fonts'
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'static',
    version: '1.0.0'
};

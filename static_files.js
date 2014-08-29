var fs = require('fs');
var path = require('path');
var publicPath = path.join(__dirname, 'public');
var faviconsPath = path.join(publicPath, 'favicons');

exports.register = function(plugin, options, next) {
    plugin.path(publicPath);

    fs.readdir(faviconsPath, function(err, files) {
        if (err) return console.err('Error reading favicons directory', faviconsPath, ':', err);
        files.forEach(function(file) {
            plugin.route({
                method: 'GET',
                path: '/' + file,
                handler: {
                    file: path.join(faviconsPath, file)
                }
            });
        });
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

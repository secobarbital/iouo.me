var fs = require('fs');
var path = require('path');
var publicPath = path.join(__dirname, 'public');
var faviconsPath = path.join(publicPath, 'favicons');
var yearInSeconds = 360*24*60*60;

exports.register = function(plugin, options, next) {
    plugin.path(publicPath);

    fs.readdir(faviconsPath, function(err, files) {
        if (err) return console.err('Error reading favicons directory', faviconsPath, ':', err);
        files.forEach(function(file) {
            plugin.route({
                method: 'GET',
                path: '/' + file,
                handler: function(request, reply) {
                    reply.file(path.join(faviconsPath, file))
                        .header('Cache-Control', 'max-age=' + yearInSeconds);
                }
            });
        });
    });

    plugin.route({
        method: 'GET',
        path: '/fonts/{file}',
        handler: function(request, reply) {
            reply.file(path.join(publicPath, request.path))
                .header('Cache-Control', 'max-age=' + yearInSeconds);
        }
    });

    next();
};

exports.register.attributes = {
    name: 'static',
    version: '1.0.0'
};

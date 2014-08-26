var Hapi = require('hapi');
var config = require('getconfig');
var server = new Hapi.Server(config.http.listen, config.http.port);
var moonbootsConfig = require('./moonbootsConfig');
var internals = {};
var staticHandler = {
    directory: {
        path: 'public'
    }
};

// set clientconfig cookie
internals.configStateConfig = {
    encoding: 'none',
    ttl: 1000 * 60 * 15,
    isSecure: config.isSecure
};
server.state('config', internals.configStateConfig);
internals.clientConfig = JSON.stringify(config.client);
server.ext('onPreResponse', function(request, reply) {
    if (!request.state.config) {
        var response = request.response;
        return reply(response.state('config', encodeURIComponent(internals.clientConfig)));
    }
    else {
        return reply();
    }
});

// require moonboots_hapi plugin
server.pack.register({plugin: require('moonboots_hapi'), options: moonbootsConfig}, function (err) {
    if (err) throw err;
});

server.pack.register(require('./static_files'), function(err) {
    if (err) throw err;
});

server.pack.register(require('./api'), function (err) {
    if (err) throw err;
});

// If everything loaded correctly, start the server:
server.start(function (err) {
    if (err) throw err;
    console.log("iouo.me is running at: http://localhost:" + config.http.port + " Yep. That\'s pretty awesome.");
});
var async = require('async');
var config = require('getconfig');
var Hapi = require('hapi');
var address = config.http.listen;
var port = process.env.PORT || config.http.port;
var moonbootsConfig = require('./moonbootsConfig');
var Jade = require('./config/jade');
var internals = {};

var server = new Hapi.Server(address, port, {
    views: {
        engines: {
            jade: Jade
        },
        path: 'views'
    }
});

// set clientconfig cookie
internals.configStateConfig = {
    encoding: 'none',
    ttl: 1000 * 60 * 15,
    isSecure: config.isSecure
};
server.state('config', internals.configStateConfig);
internals.clientConfig = JSON.stringify({
    cdnUrl: process.env.CDN_URL,
    gaPropertyId: process.env.GA_PROPERTY_ID
});
server.ext('onPreResponse', function(request, reply) {
    var response = request.response;
    if (!request.state.config && response.state) {
        return reply(response.state('config', encodeURIComponent(internals.clientConfig)));
    } else {
        return reply();
    }
});

async.parallel([
    function(done) {
        // require moonboots_hapi plugin
        server.pack.register({
            plugin: require('moonboots_hapi'),
            options: moonbootsConfig
        }, done);
    },
    function(done) {
        server.pack.register(require('./plugins/static_files'), done);
    },
    function(done) {
        server.pack.register(require('./plugins/balances'), done);
    },
    function(done) {
        server.pack.register(require('./plugins/roulette'), done);
    }
], function(err) {
    if (err) throw err;
    // If everything loaded correctly, start the server:
    server.start(function (err) {
        if (err) throw err;
        console.log("iouo.me is running at: http://" + server.info.host + ":" + server.info.port + " Yep. That\'s pretty awesome.");
    });
});

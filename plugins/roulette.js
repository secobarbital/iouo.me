var _ = require('underscore');
var accounting = require('accounting');
var events = require('events');
var stream = require('stream');
var db = require('../config/db');
var geodb = require('../config/geodb');
var emitter = new events.EventEmitter();
var hapiError;

exports.register = function(plugin, options, next) {
    hapiError = plugin.hapi.error;

    plugin.route({
        method: 'POST',
        path: '/roulette/{user}',
        handler: updatePosition
    });

    plugin.route({
        method: 'GET',
        path: '/roulette/{user}/nearby',
        handler: nearby
    });

    next();
};

exports.register.attributes = {
    name: 'roulette',
    version: '1.0.0'
};

function announce(channel, user, neighbors) {
    if (neighbors.indexOf(user) < 0) {
        return;
    }

    var neighbors = _.without(neighbors, user);
    var payload = JSON.stringify(neighbors);
    channel.write('event: neighbors\ndata: ' + payload + '\n\n');
}

function updatePosition(request, reply) {
    var user = request.params.user;
    var position = request.payload.position;

    geodb.update(user, position, function(err) {
        if (err) {
            return reply(hapiError.internal(err));
        }
        reply().code(202);
    });
    getNeighbors(position, function(err, neighbors) {
        if (err) {
            return console.error('Error getting neighbors on update', err);
        }
        if (neighbors.indexOf(user) < 0) {
            neighbors.push(user);
        }
        emitter.emit('nearby', neighbors);
    });
}

function getNeighbors(position, cb) {
    geodb.nearby(position, function(err, neighbors) {
        if (err) {
            return cb(err);
        }
        cb(null, neighbors.map(function(neighbor) {
            return neighbor.user;
        }));
    });
}

function nearby(request, reply) {
    var user = request.params.user;
    var channel = new stream.PassThrough();
    var response = reply(channel);
    var myAnnounce = announce.bind(null, channel, user);

    emitter.on('nearby', myAnnounce);

    response
        .code(200)
        .type('text/event-stream')
        .header('Cache-Control', 'no-cache')
        .header('Connection', 'keep-alive')
        .header('Content-Encoding', 'identity');

    channel.write('event: position\ndata: {}\n\n');

    request.once('disconnect', function() {
        emitter.removeListener('nearby', myAnnounce);
        geodb.remove(user, function(err, doc) {
            if (err) {
                return console.error('Error removing ' + user + ' from geodb', err);
            }
            if (doc) {
                getNeighbors(doc.raw, function(err, neighbors) {
                    if (err) {
                        return console.error('Error getting neighbors on exit', err);
                    }
                    emitter.emit('nearby', neighbors);
                });
            }
        });
    });
}

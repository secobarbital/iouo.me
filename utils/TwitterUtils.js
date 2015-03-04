'use strict';

var qs = require('querystring');

var IouUtils = require('./IouUtils');
var twitter = require('../config/twitter');

var sinceId;
var fullSearchAt;

var TwitterUtils = {
  stream: function() {
    twitter.stream('statuses/filter', { track: '#iou' }, function(stream) {
      stream.on('data', function(tweet) {
        processTweet(tweet);
      });
      stream.on('error', function(error) {
        console.error('Error in twitter search stream:', error);
      });
    });
  },

  search: function(cb) {
    var params = { q: '#iou' };
    if (sinceId && fullSearchAt > Date.now() - 86400000) {
      return performSearch(sinceId, cb);
    }
    fullSearchAt = Date.now();
    IouUtils.lastId(function(err, lastId) {
      if (err) {
        return cb('TwitterUtils.search: ' + err);
      }
      performSearch(lastId, cb);
    });
  }
};

function performSearch(sinceId, maxId, cb) {
  if (typeof(maxId) === 'function') {
    cb = maxId;
    maxId = null;
  }
  var params = {
    q: '#iou',
    result_type: 'recent',
    count: 100,
    include_entities: true
  };
  if (sinceId) params.since_id = sinceId;
  if (maxId) params.max_id = maxId;
  twitter.get('search/tweets', params, function(error, data) {
    if (error) {
      return cb('TwitterUtils.performSearch: ' + error);
    }
    var meta = data.search_metadata;
    var nextResults = meta.next_results;
    var refreshUrl = meta.refresh_url;
    var refreshParams = qs.parse(refreshUrl.slice(1));
    data.statuses.forEach(processTweet);
    if (sinceId > refreshParams.since_id) {
      sinceId = refreshParams.since_id;
    }
    if (nextResults) {
      let nextParams = qs.parse(nextResults.slice(1));
      performSearch(sinceId, nextParams.max_id, cb);
    } else {
      cb();
    }
  });
}

function processTweet(tweet) {
  console.log('tweet', tweet.id_str);
}

module.exports = TwitterUtils;

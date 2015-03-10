'use strict';

var request = require('superagent');

var qs = require('querystring');

var IouUtils = require('./IouUtils');
var twitter = require('../config/twitter');

var _sinceId;
var _fullSearchAt;

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

  search: function() {
    var params = { q: '#iou' };
    if (_sinceId && _fullSearchAt > Date.now() - 86400000) {
      return performSearch(_sinceId);
    }
    _fullSearchAt = Date.now();
    return IouUtils.lastId()
      .then(performSearch);
  }
};

function performSingleSearch(sinceId, maxId) {
  return new Promise(function(resolve, reject) {
    var params = {
      q: '#iou',
      result_type: 'recent',
      count: 100,
      include_entities: true
    };
    if (sinceId) params.since_id = sinceId;
    if (maxId) params.max_id = maxId;
    twitter.get('search/tweets', params, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function performSearch(sinceId, maxId) {
  return performSingleSearch(sinceId, maxId)
    .then(function(data) {
      var meta = data.search_metadata;
      var nextResults = meta.next_results;
      var refreshUrl = meta.refresh_url;
      var refreshParams = qs.parse(refreshUrl.slice(1));
      var processes = Promise.all(data.statuses.map(processTweet));
      if (_sinceId < refreshParams.since_id) {
        _sinceId = refreshParams.since_id;
      }
      if (nextResults) {
        let nextParams = qs.parse(nextResults.slice(1));
        return Promise.all([
          processes,
          performSearch(sinceId, nextParams.max_id)
        ]);
      } else {
        return processes;
      }
    });
}

function processTweet(tweet) {
  var doc = {
    raw: tweet,
    ower: extractOwer(tweet),
    owee: extractOwee(tweet),
    amount: extractAmount(tweet)
  };
  if (doc.ower && doc.owee && doc.amount) {
    let via = extractVia(tweet);
    if (via) doc.via = via;
    return db.pinsert(doc);
  } else {
    return Promise.resolve();
  }
}

function extractOwer(tweet) {
  if (tweet.user) {
    return {
      provider: 'twitter',
      id: tweet.user.id_str,
      username: tweet.user.screen_name,
      displayName: tweet.user.name
    };
  }
}

function extractOwee(tweet) {
  if (tweet.in_reply_to_user_id_str && tweet.entities && tweet.entities.user_mentions) {
    let candidates = tweet.entities.user_mentions.filter(function(mention) {
      return mention.id_str === tweet.in_reply_to_user_id_str;
    });
    let candidate = candidates[0];
    if (candidate) {
      return {
        provider: 'twitter',
        id: candidate.id_str,
        username: candidate.screen_name,
        displayName: candidate.name
      };
    }
  }
}

function extractAmount(tweet) {
  var m = tweet.text.match(/#iou\s+\$([.\d]+)/i);
  if (m) {
    return parseFloat(m[1]);
  }
}

function extractVia(tweet) {
  var via = tweet.text.indexOf('via');
  if (via > -1 && tweet.entities && tweet.entities.user_mentions) {
    let candidates = tweet.entities.user_mentions.filter(function(mention) {
      return mention.indices[0] > via;
    });
    let candidate = candidates[0];
    if (candidate) {
      return {
        provider: 'twitter',
        id: candidate.id_str,
        username: candidate.screen_name,
        displayName: candidate.name
      };
    }
  }
}

module.exports = TwitterUtils;
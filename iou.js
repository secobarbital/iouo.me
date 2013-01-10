(function() {
  var twitterSearchUrl = 'http://search.twitter.com/search.json?include_entities=true&callback=processResults'
    , query = parseQuery(document.location.search);

  function parseQuery(search) {
    if (!search) {
      return {};
    }

    return search.substring(1).split('&').reduce(function(query, pair) {
      var tuple = pair.split('=');

      query[tuple[0]] = tuple[1];
      return query;
    }, {});
  }

  function processResults(data) {
    data.results.forEach(function(tweet) {
      var amount, m, p;

      if (m = tweet.text.match(/\b\$?([\d\.]+)\b/)) {
        p = document.createElement('p');

        amount = parseFloat(m[1]).toFixed(2);

        if (tweet.from_user === query['twitterId']) {
          p.innerHTML = 'You owed ' + tweet.entities.user_mentions[0].name + ' $' + amount + ' on ' + tweet.created_at;
        } else {
          p.innerHTML = tweet.from_user_name + ' owed you $' + amount + ' on ' + tweet.created_at;
        }

        document.body.appendChild(p);
      }
    });
  }

  function searchMentions() {
    var script = document.createElement('script')
      , q = '#iou @' + query['twitterId'];

    script.src = twitterSearchUrl + '&q=' + encodeURIComponent(q);
    document.body.appendChild(script);
  }

  function searchFroms() {
    var script = document.createElement('script')
      , q = '#iou from:' + query['twitterId'];

    script.src = twitterSearchUrl + '&q=' + encodeURIComponent(q);
    document.body.appendChild(script);
  }

  if (Object.keys(query).length) {
    document.body.innerHTML = '<h1>Ledger for @' + query['twitterId'] + '</h1>';
    window.processResults = processResults;
    searchMentions();
    searchFroms();
  }
})();

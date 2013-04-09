(function() {
  var tweet;

  tweet = function(href) {
    var params;
    if (~navigator.userAgent.indexOf(' Mobile') && ~navigator.userAgent.indexOf(' AppleWebKit')) {
      params = href.split('?', 2)[1].split('&').reduce(function(m, kv) {
        var k, v, _ref;
        _ref = kv.split('='), k = _ref[0], v = _ref[1];
        m[k] = v;
        return m;
      }, {});
      setTimeout(function() {
        if (document.webkitHidden) {
          return window.location.reload();
        } else {
          return window.location = href;
        }
      }, 300);
      return window.location = "twitter://post?message=" + params.text;
    }
  };

  $(document).on('mobileinit', function() {
    return $.mobile.defaultPageTransition = 'slide';
  }).on('pageinit', '.ledger', function(e) {
    var _ref;
    $('time', e.target).timeago();
    return typeof twttr !== "undefined" && twttr !== null ? (_ref = twttr.widgets) != null ? _ref.load() : void 0 : void 0;
  }).on('pageinit', '#owe-someone', function(e) {
    return $('form', e.target).on('submit', function(e) {
      var amount, owee;
      e.preventDefault();
      e.stopPropagation();
      owee = $('[name=owee]', e.target).val();
      amount = $('[name=amount]', e.target).val();
      if (owee && amount) {
        return tweet("https://twitter.com/intent/tweet?text=" + (escape("" + owee + " #iou " + amount)));
      }
    });
  }).on('click', 'a[href*="twitter.com/intent/tweet"]', function(e) {
    if (tweet(e.currentTarget.href)) {
      return e.preventDefault();
    }
  });

}).call(this);

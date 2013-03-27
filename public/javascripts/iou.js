(function() {

  $.cachedScript = function(url, options) {
    options = $.extend(options || {}, {
      dataType: 'script',
      cache: true,
      url: url
    });
    return $.ajax(options);
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
        return window.location = "https://twitter.com/intent/tweet?text=" + (escape("" + owee + " #iou " + amount));
      }
    });
  });

  $(function() {
    return $.cachedScript('//platform.twitter.com/widgets.js');
  });

}).call(this);

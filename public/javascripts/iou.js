(function() {

  $(document).on('mobileinit', function() {
    return $.mobile.defaultPageTransition = 'slide';
  }).on('pageinit', '.ledger', function(e) {
    return $('time', e.target).timeago();
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

}).call(this);

(function() {

  $(document).on('mobileinit', function() {
    return $.mobile.defaultPageTransition = 'slide';
  }).on('pageinit', '.ledger', function() {
    return $('time').timeago();
  }).on('pageinit', '#owe-someone', function() {
    return $('form', this).on('submit', function(e) {
      var amount, owee;
      e.preventDefault();
      owee = $('[name=owee]').val();
      amount = $('[name=amount]').val();
      if (owee && amount) {
        return window.location = "https://twitter.com/intent/tweet?text=" + (escape("" + owee + " #iou " + amount));
      }
    });
  });

}).call(this);

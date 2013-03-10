(function() {

  $(document).on({
    mobileinit: function() {
      return $.mobile.defaultPageTransition = 'slide';
    },
    pageinit: function() {
      return $('time').timeago();
    }
  });

}).call(this);

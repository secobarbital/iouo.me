$(document).on('pageinit', function(e) {
  twttr.ready(function() {
    $('[data-tweet-embed]').each(function() {
      var el = $(this);
      twttr.widgets.createTweetEmbed(el.data('tweet-embed'), this, function(newEl) {
        el.children().not(newEl).remove();
      });
    });
  });
});

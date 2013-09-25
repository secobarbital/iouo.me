head(function() {
  function listenForNeighbors() {
    var source = new EventSource(location.pathname + '/nearby');
    source.addEventListener('message', function(e) {
      var data = JSON.parse(e.data);
      $('.roulette-headline').text(data.headline);
      $('.roulette-panel').html(data.neighbors);
    }, false);
  }

  function handleGeo(position) {
    $('.roulette').show();
    $.post(location.pathname, {
      position: position
    });
  }

  function handleGeoError(err) {
    switch (err.code) {
      case 1:
        $('.roulette-geo-permission-denied').show();
        break;
      case 2:
        $('.roulette-geo-position-unavailable').show();
        break;
      case 3:
        $('.roulette-geo-timeout').show();
        break;
      default:
        $('.roulette-geo-error-message').text(err.message);
        $('.roulette-geo-error').show();
        break;
    }
  }

  function enableGeo() {
    navigator.geolocation.getCurrentPosition(handleGeo, handleGeoError, {
      enableHighAccuracy: true,
      timeout: 5000
    });
  }

  if (('geolocation' in navigator) && ('EventSource' in window)) {
    listenForNeighbors();
    enableGeo();
  } else {
    $('.roulette-features-missing').show();
  }

  $('.roulette-geo-enable').on('click', function(e) {
    e.preventDefault();
    location.reload();
  });
});

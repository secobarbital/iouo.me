head(function() {
  function listenForNeighbors() {
    var source = new EventSource(location.pathname + '/nearby');
    source.addEventListener('message', function(e) {
      var data = JSON.parse(e.data);
      $('.roulette-panel').html(data.neighbors);
    }, false);
  }

  function handleGeo(position) {
    $.post(location.pathname, {
      position: position
    });
  }

  function handleGeoError(err) {}

  if (navigator.geolocation && window.EventSource) {
    listenForNeighbors();
    navigator.geolocation.getCurrentPosition(handleGeo, handleGeoError, {
      enableHighAccuracy: true,
      maximumAge: 60000
    });
  }
});

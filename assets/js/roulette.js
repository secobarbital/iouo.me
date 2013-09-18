head(function() {
  function listenForNeighbors() {
    var source = new EventSource(location.pathname + '/nearby');
    source.addEventListener('message', function(e) {
      $.each(e.data, function(i, name) {
        $('.balances .subject:contains(' + name + ')')
          .parents('.list-group-item')
          .appendTo('.neighbors .list-group');
      });
    }, false);
  }

  function ensureView() {
    $('.balances, .roulette').hide();
    $('.neighbors').show();
  }

  function handleGeo(position) {
    console.log('position', position);
    ensureView();
    $.post(location.pathname, {
      position: position
    });
  }

  function handleGeoError(err) {}

  if (navigator.geolocation && window.EventSource) {
    $('.roulette').on('click', function(e) {
      listenForNeighbors();
      navigator.geolocation.getCurrentPosition(handleGeo, handleGeoError, {
        enableHighAccuracy: true,
        maximumAge: 60000
      });
    });
  }
});

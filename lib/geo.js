// http://stackoverflow.com/a/3144867
// http://www.movable-type.co.uk/scripts/latlong.html
// http://williams.best.vwh.net/avform.htm

function toRad(deg) {
  return deg * 180 / Math.PI;
}

function toDeg(rad) {
  return rad * Math.PI / 180;
}

function destinationPoint(lon, lat, brng, dist) {
  var radius = 6371; // radius of Earth
  dist = dist/radius;  // convert dist to angular distance in radians
  brng = toRad(brng);

  var lat1 = toRad(lat), lon1 = toRad(lon);

  var lat2 = Math.asin( Math.sin(lat1)*Math.cos(dist) +
                        Math.cos(lat1)*Math.sin(dist)*Math.cos(brng) );
  var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(dist)*Math.cos(lat1),
                               Math.cos(dist)-Math.sin(lat1)*Math.sin(lat2));
  lon2 = (lon2+3*Math.PI) % (2*Math.PI) - Math.PI;  // normalise to -180..+180º

  return [toDeg(lon2), toDeg(lat2)];
}

function bbox(lon, lat, dist) {
  return [
    destinationPoint(lon, lat, -90, dist)[0],
    destinationPoint(lon, lat, 180, dist)[1],
    destinationPoint(lon, lat, 90, dist)[0],
    destinationPoint(lon, lat, 0, dist)[1]
  ];
}

function polygon(lon, lat, dist) {
  var mdist = dist/1000;
  var box = bbox(lon, lat, mdist);
  return {
    type: "Polygon",
    coordinates: [
      [box[0], box[1]],
      [box[0], box[3]],
      [box[2], box[3]],
      [box[2], box[1]],
      [box[0], box[1]]
    ]
  }
}

exports.polygon = polygon;

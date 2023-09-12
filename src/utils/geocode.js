const request = require("request");

const geoCode = function (address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZGVzcGljYWJsZWtpbmciLCJhIjoiY2t1YnMwMTNsMHRhcjJwbG1mN3lkNmVjeCJ9.hOEqyYl1QFaXYHgmDotCNA&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback(
        `Can't connect to map service. check your internet connection`,
        undefined
      );
    } else if (body.features.length == 0) {
      callback(`Place not found! Try another search`, undefined);
    } else {
      callback(undefined, {
        lon: body.features[0].center[0],
        lat: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;

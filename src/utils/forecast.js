const request = require("request");
const weather = function (lat, lon, callback) {
  const url = `https://api.weatherapi.com/v1/current.json?key=94f44aaddaf64d38aea114445230709&q=${lat},${lon}&aqi=no`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback(`Unable to connect to weather service`, undefined);
    } else if (body.error) {
      callback(body.error.message, undefined);
    } else {
      callback(undefined, {
        forecast: `${body.current.condition.text}. It is currently ${body.current.temp_c} degrees out. There is a ${body.current.precip_mm}% chance of rain.`,
        location: body.location.name,
      });
    }
  });
};

module.exports = weather;

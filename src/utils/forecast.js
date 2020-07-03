const request = require("request");
const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=6f2ef99e5b10cfded00bfef745bea3c0&query=" + latitude + "," + longitude;
    request({
        url: url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('unable to connect to location services ', undefined)
        } else if (body.error) {
            callback("unable to find location " + body.error.code, undefined);
        } else {

            callback(undefined,
                "it feels like " + body.current.temperature + " degrees."

            );

        }
    })
};

module.exports = forecast
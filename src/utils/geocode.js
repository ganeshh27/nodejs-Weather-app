const request = require("request");
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZ2FuZXNoaDI3IiwiYSI6ImNrYzBob200ZTBsamsydW1yZ3RwMDE0YXIifQ.QWtvjAY9nwilvE2X1BLocQ&limit=1";
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('unable to connect to location services ', undefined)
        } else if (response.body.features.length === 0) {
            callback("unable to find location", undefined);
        } else {

            callback(undefined, {
                latitude: response.body.features[0].geometry.coordinates[1],
                longitude: response.body.features[0].geometry.coordinates[0],
                location: response.body.features[0].place_name
            });

        }
    })
};

module.exports = geocode
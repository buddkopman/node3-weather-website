const request = require('request');

const geocode = (address, callback) => 
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmtvcG1hbiIsImEiOiJja20wdnNvMDgxOWkxMm9wazZ2ZjQ1YjExIn0.kJeF3N0I5dE8TWCBW_v5RQ&limit=1';
    request({url, json: true}, (error, {body}) => 
    {
        if (error)
            callback("Unable to connect to geocoding service", undefined);
        else if (body.features.length === 0)
            callback("Unable to find location", undefined);
        else
        {
            const {center, place_name} = body.features[0];
            callback(undefined, 
            {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            });
        }
    });
};

module.exports = geocode;


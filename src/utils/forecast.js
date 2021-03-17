const request = require('request');

const forecast = (latitude, longitude, callback) =>
{
    const url = 'http://api.weatherstack.com/current?access_key=135d73090e0a7d19031806001489ea9d&units=f&query=' + latitude+", "+longitude;

    request({url, json: true}, (error, {body}) =>
    {
        if (error)
            callback("Unable to connect to weather service", undefined);
        else if (body.error)
            callback("Unable to find location", undefined);
        else
        {
            const {weather_descriptions, temperature, feelslike, wind_speed, wind_dir} = body.current;
            callback(undefined, 
                {
                    description: weather_descriptions[0],
                    temperature: temperature,
                    feelslike:   feelslike,
                    windspeed: wind_speed,
                    winddir: wind_dir
                }
            );
        }
    });
};

module.exports = forecast;

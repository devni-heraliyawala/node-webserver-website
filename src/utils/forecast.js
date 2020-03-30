const request = require('request')

const foreCast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/528c6f057b1869a3fb5a2f95bb29fcc3/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true }, (error, { body: responseBody }) => {
        if (error) {
            callback('Unable to connect to the weather service', undefined)
        } else if (responseBody.error) {
            callback('Unable to find location. Please retry...', undefined)
        } else {
            callback(undefined, {
                foreCastSummary: responseBody.daily.data[0].summary +
                    ' It is currently ' + responseBody.currently.temperature + ' degrees out. There is ' +
                    responseBody.currently.precipProbability + '% chance of rain & minimum temperature is ' +
                    responseBody.daily.data[0].temperatureMin
            })
        }
    })
}

module.exports = foreCast
const request = require('request')

const geoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGV2bmloIiwiYSI6ImNrODdreTEyYzBoNzAzbm8wOWZrb2NrZnMifQ.sacZKiVV4XMfOrmWVv6w0Q&limit=1&language=en'

    request({ url, json: true }, (error, { body: responseBody }) => {
        const { features = [] } = responseBody
        if (error) {
            callback('Unable to connect to location serviceS', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search...', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}


module.exports = geoCode
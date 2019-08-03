const axios = require('axios')

const getGeo = async (address) => {
    try {
        const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZ2VuenIiLCJhIjoiY2p5c2w4bXR4MG40eTNkc2Vudm8xYTI1cyJ9.oC0SL3EnP1lo_h_75sc6xA&limit=1`
        const response = await axios.get(geoURL) 
        const data = response.data
        console.log(data.query)
        if (data.query.length < 1 ) {
            return {
                error: 'Please make sure you enter a valid search result'
            }
        } else {
            const long = data.features[0].geometry.coordinates[0]
            const lat = data.features[0].geometry.coordinates[1]
            const location = data.features[0].place_name
            return {
                long,
                lat,
                location
            }
        }
    } catch (error) {
        console.log('There has been an error returning the search result')
    }
}

const getWeather = async (address) => {
    try {
        const geoData = await getGeo(address)
        const weatherURL = `https://api.darksky.net/forecast/1c2ac9cf96405e17c939d056625894f8/${geoData.lat},${geoData.long}?units=si`
        const response = await axios.get(weatherURL)
        const data = response.data
        const temp = data.currently.temperature
        const chanceRain = data.currently.precipProbability
        const summary = data.daily.data[0].summary
        const location = geoData.location
        return({
            forecast: `${summary} It is currently ${temp} out. There and there is ${chanceRain}% chance of rain`,
            location
        })
    } catch (error) {
        return {
            error: 'Please make sure you enter a valid address'
        }
    }
}

module.exports = {
    getWeather
}
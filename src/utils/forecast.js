const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=160fe9e09843ef8e9a23ad2285610802&query='+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude)

    request({ url: url, json: true}, (error, response, body) => {
        if(error){
            callback('Unable to connect to Weather service', undefined)
        }else if(body.error){
            callback('Unable to find Location', undefined)
        }else{
            callback(undefined, 'It is currently '+ body.current.temperature +' degree celcius. It feels like ' + body.current.feelslike + ' degrees. The Wind Speed is '+ body.current.wind_speed)
        }
    })
}

module.exports = forecast
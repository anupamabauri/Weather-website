const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/bb2226ae3aaf28589e1f7a2c992644f0/' + latitude + ',' + longitude

    request({ url, json: true},(error, {body})=>{

    if(error){
        callback("Unable to connect weather service...",undefined)
    }
    else if(body.error){
        console.log("Provide correct input",undefined)
    }
    else{
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
    }
    
    })
}

module.exports = forecast
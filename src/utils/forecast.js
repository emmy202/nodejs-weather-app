 const request = require('request')



 const forecast = (latitude, longitude, callback) => {
     const url = 'https://api.darksky.net/forecast/f31f95f9dc00b555ae02faa7a96ccb98/'+latitude+', '+ longitude 
     request({url: url, json: true }, (error, {body}) => {
         if(error){
             callback('Unable to connect to weather services', undefined)
         }  else if (body.error) {
           callback("Unable to find location", undefined)  
         } else {
             callback(undefined, 'It is  currently '+ body.currently.temperature+' degress out. there is a '+ body.currently.precipProbability +'% chance of rain !')
         }
     })

 }

 module.exports = forecast
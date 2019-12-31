const request=require('request');
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/4243cfacecd4ccd182d15efb543bb796/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si';
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to find the service!',undefined);
        }
        else if(response.body.error){
            callback('unable to find location!',undefined);
        }
        else{
            callback(undefined,response.body.daily.data[0].summary +' it is currently '+response.body.currently.temperature +' degrees out. There is a '+response.body.currently.precipProbability+'% chance of rain . wind speed is '+response.body.currently.windSpeed+"km/h.");
        }
    })
};
module.exports=forecast;
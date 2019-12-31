const request=require('request');
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibW9heWFkOTkiLCJhIjoiY2s0anViYWIwMDQ3ajNsbjVtMW5mdjFtdiJ9.xgc3FwGMfsp4BP2ibhzCcw&limit=1'
    request({url,json:true},(error,response)=>{
    if(error){
       callback('unable to connect to the service!',undefined);
    }
    else if(response.body.features.length===0){
       callback('unable to find location!',undefined);
    }
    else{
       callback(undefined, {
          latitude:response.body.features[0].center[1],
          longitude:response.body.features[0].center[0],
          location:response.body.features[0].place_name
       });
    }
    });
    };
module.exports=geocode;    
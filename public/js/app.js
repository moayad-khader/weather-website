

const weather_form=document.querySelector(".get_weather");
const search_address=document.querySelector("#address");
const message_one=document.querySelector('#result_1');
const message_two=document.querySelector('#result_2');



weather_form.addEventListener("submit",(event)=>{
    
    
    event.preventDefault();
    const address=search_address.value;


    fetch("http://localhost:3000/weather?address="+address).then((response)=>{
    
    response.json().then((data)=>{
        if(data.error){
           message_one.textContent=data.error;
           message_two.textContent="";
        }
        
        else{
           message_one.textContent=data.location;
           message_two.textContent=data.forecast;
        }
    })
})
})
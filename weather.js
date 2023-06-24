let from = document.querySelector("form");
let searchField = document.querySelector(".searchField");

// display attributes
let temprature = document.querySelector(".temp");
let emoji = document.querySelector(".weather_condition img");
let currentLocation = document.querySelector(".time_location p");
let weatherConditon = document.querySelector(".weather_condition span");
let dateField = document.querySelector(".time_location span");


let target = "Kolkata";

let dayArray = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];

from.addEventListener("submit", function(e) {
    e.preventDefault();
    target = searchField.value;
    fetchSeatherData(target);
})

// calling the api
async function fetchSeatherData(target){
   
    try{

        let url = `https://api.weatherapi.com/v1/current.json?key=4ce61316dd34439592b184508230706&q=${target}&aqi=no`;
        //getting the response from the url
        let response  = await fetch(url);
        // console.log("response", response);
        let data = await  response.json();
        // console.log("data", data);
        // getting the weather information from the data
        let currentTemp = data.current.temp_c;
        let currentCondition = data.current.condition.text
        let location = data.location.name; 
        let timeAndDate = data.location.localtime;
        let iconImage = data.current.condition.icon;
        // console.log(currentTemp, currentCondition, location, timeAndDate, iconImage);
        updateDom(currentTemp, currentCondition, location, timeAndDate, iconImage);
    }

    catch(error){
        alert("Please enter the correct location");
    }


}

function updateDom(temp, condition, location, timeDate, icon){
   
    let dateTime = timeDate.split(" ");
    // console.log(dateTime);

    let date = dateTime[0];
    let time = dateTime[1];
    let day = new Date(date).getDay();

    let dayName = dayArray[day];


    dateField.innerText = ` ${dayName} ${time}  ${date}`;
    temprature.innerText = temp;
    currentLocation.innerText = location;
    emoji.src = icon;
    weatherConditon.innerText = condition;
}

fetchSeatherData(target);
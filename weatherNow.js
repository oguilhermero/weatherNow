/**
 * All weather data used in here is fetched from Accuweather API (http://www.accuweather.com) and is used under it's license.
 */

//Set up data to fetch API URL from Accuweather
const prompt = require("prompt-sync")({sigint: true});
const { json } = require("express");
const api_key = require("./api-key.js");
const location = prompt("In what city are you at? ");
// const location = "São Paulo"; //used to debug code
const units = "m";
const url = `http://dataservice.accuweather.com/`;
const currentWeatherURL = "currentconditions/v1/";
const locationsURL = "locations/v1/cities/search/";


const currentWeather = async () =>{
    let locationId;
    let country;
    let city;
    let resultArray;
    let temperature;

    //Get locationId variable from Location API
    try{
        const response = await fetch(url + locationsURL + api_key + "&q=" + location,{method: "GET", cache: "no-cache"});
        // console.log(url + locationsURL + api_key + "&q=" + location);
        if(response.ok){
            const jsonResponse = await response.json();
            locationId = jsonResponse[0].Key;
            country = jsonResponse[0].Country.LocalizedName;
            city = jsonResponse[0].LocalizedName;
            resultArray = [locationId, country, city];
        }
    } catch(error){
        console.log(error);
    }

    //Pass locationId variable to Current Weather API
    try{
        const response = await fetch(url + currentWeatherURL + await resultArray[0] + api_key,{method: "GET", cache: "no-cache"});
        if (response.ok){
            const jsonResponse = await response.json();
            temperature = jsonResponse[0].Temperature.Metric.Value;
        }
    } catch(error) {
        console.log(error);
    }

    const weatherStatus = (temperature) => {
        if(temperature >= 25){
            return `It's kinda hot!`
        } else if (temperature >= 18 && temperature < 25){
            return `It's a great weather, enjoy!`
        } else if (temperature > 12 && temperature < 18){
            return `It's getting cold, pick up a coat!`
        } else if (temperature > 0 && temperature < 12){
            return `It's cold! Get a coat and go to a warm place.`
        } else if (temperature < 0){
            return `It's freezing right now! Go get warm!`
        }
    }

    const weatherMessage = weatherStatus(temperature);

    console.log(`Hey there! \nIf you're at ${city}, ${country}, current temperature is ${temperature}° celsius.\n${weatherMessage}`)
}

currentWeather();
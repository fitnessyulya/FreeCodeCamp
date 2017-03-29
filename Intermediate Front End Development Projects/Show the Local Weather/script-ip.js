"use strict";

var userLocation = {
    latitude: 0,
    longitude: 0,
    cityCountry: "loading...",
}

var userWeather = {
    temperature: "loading...",
    units: "metric",
    icon: "loading...",
    description: "loading..."
}

// geoinformation by IP was taken from here:
// http://stackoverflow.com/a/35123097

// there was a question mark after = that was braking the response
var ipDataService = "http://gd.geobytes.com/GetCityDetails?callback=";

// promise implementation taken from http://stackoverflow.com/a/30008115
function makeRequest (method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

function getCoordinates(response) {
    let ipData = JSON.parse(response);
    console.log(ipData);
    userLocation.latitude = ipData.geobyteslatitude;
    userLocation.longitude = ipData.geobyteslongitude;
    userLocation.cityCountry = ipData.geobytesfqcn;
    console.log(`${userLocation.latitude}`
        + " "
        + `${userLocation.longitude}`
        + " "
        + `${userLocation.cityCountry}`);
}

function setWeatherAPILink() {
    console.log(`http://api.openweathermap.org/data/2.5/weather?lat=`
        + `${userLocation.latitude}`
        + `&lon=`
        + `${userLocation.longitude}`
        + `&APPID=82c9ee7accb1cba5836ff0d43572cf35`);
    return `http://api.openweathermap.org/data/2.5/weather?lat=`
        + `${userLocation.latitude}`
        + `&lon=`
        + `${userLocation.longitude}`
        // + `&units=metric`
        + `&APPID=82c9ee7accb1cba5836ff0d43572cf35`;
}

function getUserWeather(weatherData) {
    let weatherDatatJSON = JSON.parse(weatherData);
    userWeather.temperature = weatherDatatJSON.main.temp;
    console.log(userWeather.temperature);
    userWeather.icon = weatherDatatJSON.weather[0].icon;
    console.log(userWeather.icon);
    userWeather.description = weatherDatatJSON.weather[0].description;
    console.log(userWeather.description);
}

function updateUI() {
    document.getElementById("cityCountry").innerHTML = userLocation.cityCountry;
    document.getElementById("temperature").innerHTML = userWeather.temperature;
    document.getElementById("weatherIcon").innerHTML = `<img `
    + `src="`
    + `http://openweathermap.org/img/w/`
    + `${userWeather.icon}`
    + `.png">`;
    document.getElementById("weatherDescription").textContent = userWeather.description;
}

var getWeather = makeRequest('GET', ipDataService)
    .then((response) => getCoordinates(response))
    .then((response) => setWeatherAPILink(response))
    .then((weatherAPILink) => makeRequest('GET', weatherAPILink))
    .then((weatherData) => getUserWeather(weatherData))
    .then(() => updateUI())
    .catch(function (err) {
        console.error('Augh, there was an error!', err.statusText);
});

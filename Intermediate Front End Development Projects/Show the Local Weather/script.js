'use strict';

var userLocation = {
    zipCode: '',
    city: '',
    regionCode: '',
    countryName: '',
    countryCode: '',
    get zip() { return this.zipCode; },
    set zip(value) { this.zipCode = value }
};

var userWeather = {
    tempMetric: "",
    tempMetricSymb: "ºC",
    tempImperial: "",
    tempImperialSymb: "ºF",
    units: "metric",
    icon: "",
    description: ""
};

// geoinformation by IP was taken from here:
// http://stackoverflow.com/a/35123097

var ipDataService = "http://freegeoip.net/json/?callback=?";

function makeRequest(url) {
    return new Promise(function (resolve, reject) {
        $.getJSON(url, function (data) {
            if (data) {
                resolve(data);
            } else {
                reject(`Couldn't get JSON data from ${ipDataService}`);
            }
        });
    });
}

function getLocationParams(response) {
    if (!userLocation.zip) {
        userLocation.zip = response.zip_code;
        userLocation.city = response.city;
        userLocation.regionCode = response.region_code;
        userLocation.countryCode = response.country_code;
        userLocation.countryName = response.country_name;
    } else {
        userLocation.zip = userInput;
    }
}

function setWeatherAPILink() {
    return `http://api.openweathermap.org/data/2.5/weather?zip=`
        + `${userLocation.zip},`
        + `${userLocation.countryCode}`
        + `&units=${userWeather.units}`
        + `&APPID=ad25adff4b6456370b112d0fcf61b2ed`;
}

function getUserWeather(weatherData) {
    userWeather.tempMetric = weatherData.main.temp;
    userWeather.icon = weatherData.weather[0].icon;
    userWeather.description = weatherData.weather[0].description;
}

function updateUI() {
    document.getElementById("cityCountry").innerHTML = userLocation.city;
    document.getElementById("temperature").textContent = Math.round(userWeather.tempMetric);
    document.getElementById("tempUnits").textContent = userWeather.tempMetricSymb;
    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/w/`
    + `${userWeather.icon}`
    + `.png`;
    document.getElementById("weatherDescription").textContent = userWeather.description;
}

function cToF(temp) {
    userWeather.tempImperial = temp * (9/5) + 32;
}

makeRequest(ipDataService)
    .then(response => getLocationParams(response))
    .then((response) => setWeatherAPILink(response))
    .then((weatherAPILink) => makeRequest(weatherAPILink))
    .then((weatherData) => getUserWeather(weatherData))
    .then(() => updateUI())
    .then(() => cToF(userWeather.tempMetric))
    .catch(function (err) {
        'use strict';
        console.error('Augh, there was an error!', err.statusText);
    });

function changeTempUnits() {
    if (userWeather.units === "metric") {
        userWeather.units = "imperial";
        document.getElementById("temperature").textContent = Math.round(userWeather.tempImperial);
        document.getElementById("tempUnits").textContent = userWeather.tempImperialSymb;
    } else {
        userWeather.units = "metric";
        document.getElementById("temperature").textContent = Math.round(userWeather.tempMetric);
        document.getElementById("tempUnits").textContent = userWeather.tempMetricSymb;
    }
}

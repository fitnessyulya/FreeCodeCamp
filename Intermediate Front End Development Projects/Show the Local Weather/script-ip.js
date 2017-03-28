
var latitude, longitude;

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
    latitude = ipData.geobyteslatitude;
    longitude = ipData.geobyteslongitude;
    console.log(latitude + " " + longitude);
}

function setWeatherAPILink() {
    console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=82c9ee7accb1cba5836ff0d43572cf35`);
    return `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=82c9ee7accb1cba5836ff0d43572cf35`
}

makeRequest('GET', ipDataService)
.then((response) => getCoordinates(response))
.then((response) => setWeatherAPILink(response))
.catch(function (err) {
    console.error('Augh, there was an error!', err.statusText);
});


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

// function getCoordinates(ipData) {
//     latitude = ipData.geobyteslatitude;
//     longitude = ipData.geobyteslongitude;
// }

// Example:

makeRequest('GET', ipDataService)
.then(function(response) {
    console.log(JSON.parse(response));
    let ipData = JSON.parse(response);
    latitude = ipData.geobyteslatitude;
    longitude = ipData.geobyteslongitude;
    console.log(latitude + " " + longitude);
})
.catch(function (err) {
    console.error('Augh, there was an error!', err.statusText);
});

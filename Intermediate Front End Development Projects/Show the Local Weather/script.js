function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);


//////////////////////
  // function loadJSON(callback) {   
  //   var xobj = new XMLHttpRequest();
  //       xobj.overrideMimeType("application/json");
  //   xobj.open('GET', 'https://github.com/gatezh/FreeCodeCamp/blob/master/Intermediate%20Front%20End%20Development%20Projects/Build%20a%20Random%20Quote%20Machine/myQuotes.json', false); // Replace 'my_data' with the path to your file
  //   xobj.onreadystatechange = function () {
  //         if (xobj.readyState == 4 && xobj.status === 200) {
  //           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
  //           callback(xobj.responseText);
  //         }
  //   };
  //   xobj.send(null);
  // }

  // function init() {
  //   loadJSON(function(response) {
  //     // Parse JSON string into object
  //     console.log(response);
  //     var actual_JSON = JSON.parse(response);
  //   });
  // }

  // init();


  var file = 'https://github.com/gatezh/FreeCodeCamp/blob/master/Intermediate%20Front%20End%20Development%20Projects/Build%20a%20Random%20Quote%20Machine/myQuotes.json';

  function XHR(file, callback){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            callback(xhr.responseText);
        }
    }
    xhr.open('GET', file, true);
    xhr.send();
  }

  console.log( XHR(file) );

}

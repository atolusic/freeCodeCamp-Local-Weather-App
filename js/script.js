var getTemp = document.querySelector("#getTemp");
var x = document.getElementById("x");
var y = document.getElementById("y");
var cityName = document.querySelector("#cityName");
var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?';
var lat, lon;


window.onload = function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            cityName.innerHTML = "Getting Location..."
            getWeather(lat, lon);
          });
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }

      function getWeather(lat, lon){
            var apiKey = '&appid=5677b62aa10702961553ced734501077'
            var urlString = apiUrl + 'lat=' + lat + '&' + 'lon=' + lon + apiKey;
            var request = new XMLHttpRequest();
            request.open('GET', urlString, true);
            request.onreadystatechange = function() {
              if(request.readyState === 4 && request.status === 200){
                var data = JSON.parse(request.responseText);
                  console.log(data);
                cityName.innerHTML = '<i style="color: white;" class="fa fa-map-marker" aria-hidden="true"></i> ' + data.name + ', ' + data.sys.country;
                console.log(data.weather[0].icon);
                iconGen(data.weather[0].icon);
              }
            }
            request.send();
      }
      function iconGen(vrijeme){
        var srcAttr = 'icons/' + vrijeme + '.png';
        document.querySelector('.weatherImage').setAttribute('src', srcAttr);
        }
}

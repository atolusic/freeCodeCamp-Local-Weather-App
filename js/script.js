var getTemp = document.querySelector("#getTemp");
var x = document.getElementById("x");
var y = document.getElementById("y");
var cityName = document.querySelector("#cityName");
var showTemp = document.querySelector("#showTemp")
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
                var currentTime = new Date();
                document.querySelector("#showTime").innerHTML = currentTime.toLocaleString();
                cityName.innerHTML = '<i style="color: white;" class="fa fa-map-marker" aria-hidden="true"></i> ' + data.name + ', ' + data.sys.country;
                showTemp.innerHTML = (data.main.temp - 273.15);
                document.querySelector("#highLow").innerHTML = '<i class="wi wi-thermometer"></i> ' + 'High: ' + (data.main.temp_min - 273.15) + '/Low: ' + (data.main.temp_max - 273.15);
                tempUnit.addEventListener("click", function() {
                  var tempUnit = document.querySelector("#tempUnit");
                  if(tempUnit.textContent === '°C'){
                    tempUnit.textContent = '°F';
                    showTemp.innerHTML = (data.main.temp_min - 273.15) * 9/5 + 32;
                    showTemp.classList.add('edit');
                    document.querySelector("#showTime").style.marginTop = '20px';
                    document.querySelector("#highLow").innerHTML = '<i class="wi wi-thermometer"></i> ' + 'High: ' + (data.main.temp_min - 273.15) * 9/5 + 32 + '/Low: ' + (data.main.temp_max - 273.15) * 9/5 + 32;
                  } else {
                    tempUnit.textContent = '°C';
                    showTemp.classList.remove('edit');
                    document.querySelector("#showTime").style.marginTop = '0px';
                    showTemp.innerHTML = (data.main.temp - 273.15);
                    document.querySelector("#highLow").innerHTML = '<i class="wi wi-thermometer"></i> ' + 'High: ' + (data.main.temp_min - 273.15) + '/Low: ' + (data.main.temp_max - 273.15);
                  }
                });
                document.querySelector("#humidity").innerHTML = data.main.humidity + '%';
                document.querySelector("#pressure").innerHTML = data.main.pressure + ' hPa';
                if(data.wind.deg === undefined){
                  document.querySelector("#wind").innerHTML = 'S: ' + data.wind.speed + ' km/h'
                } else{
                  document.querySelector("#wind").innerHTML = 'S: ' + data.wind.speed + ' km/h,' + '<br>' + 'D: ' + data.wind.deg + '°';
                }
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

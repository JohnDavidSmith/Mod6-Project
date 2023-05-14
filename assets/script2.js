var currentContainer = document.getElementById('current');
var next1Container = document.getElementById('next1');
var next2Container = document.getElementById('next2');
var fetchButton = document.getElementById('cityName');
var cityName = "";
var APIKey = "220446bbfe0cd21fc71d987d2f3b237f";


//For Current Weather
    function getApi(){ 
      console.log("get API function running");
      var requestUrl ='https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey;
    
      const form = document.querySelector('form');
      const submitBtn = document.querySelector('#submitBtn');
      
      submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
      
        cityName = document.querySelector('#cityName').value;
        requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey;
      
        // Make API request with new URL
        fetch(requestUrl, {
          cache: 'reload',
        })
          .then(function (response) {
            console.log(response);
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            // Clear previous search results
            currentContainer.innerHTML = "";
            // Create and append new elements for the search results
            var cityName = document.createElement('h3');
            var currentDate = document.createElement('h3');
            var currentIcon = document.createElement('h3');
            var currentTemp = document.createElement('p');
            var currentHumidity = document.createElement('p');
            var currentWindSpeed = document.createElement('p');
    
            cityName.textContent = data.name;
            currentDate.textContent = new Date().toLocaleDateString();
            currentIcon.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">`;
            currentTemp.textContent = `Temperature: ${Math.round(data.main.temp - 273.15)}°C`;
            currentHumidity.textContent = `Humidity: ${data.main.humidity}%`;
            currentWindSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    
            currentContainer.append(cityName);
            currentContainer.append(currentDate);
            currentContainer.append(currentIcon);
            currentContainer.append(currentTemp);
            currentContainer.append(currentHumidity);
            currentContainer.append(currentWindSpeed);
    
          })
          .catch(function(error) {
            console.log(error);
            currentContainer.innerHTML = `<p>Sorry, we could not find the weather data for ${cityName}. Please try again.</p>`;
          });
      });
    }
    fetchButton.addEventListener('click', getApi);

//For next1 Weather

    function getApi1(){ 
      console.log("get API function running");
      var requestUrl1 ='https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey;
      
      submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
      
        cityName = document.querySelector('#cityName').value;
        requestUrl1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey;
      
        // Make API request with new URL
        fetch(requestUrl1, {
          cache: 'reload',
        })
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then(data => {
          var lat = data.coord.lat;
          var lon = data.coord.lon;
          forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${APIKey}`;
          return fetch(forecastUrl);
        })

          .then(function (response) {
            console.log(response);
            return response.json();
          })
          .then(function (data1) {
            console.log(data1);
            // Clear previous search results
            next1Container.innerHTML = "";
            // Create and append new elements for the search results
            var cityName = document.createElement('h3');
            var currentDate = document.createElement('h3');
            var currentIcon = document.createElement('h3');
            var currentTemp = document.createElement('p');
            var currentHumidity = document.createElement('p');
            var currentWindSpeed = document.createElement('p');
    
            var tomorrow = data1.daily[1];

            cityName.textContent = data1.name;
            currentDate.textContent = new Date(tomorrow.dt * 1000).toLocaleDateString();
            currentIcon.innerHTML = `<img src="https://openweathermap.org/img/w/${data1.weather[0].icon}.png">`;
            currentTemp.textContent = `Temperature: ${Math.round(data1.main.temp - 273.15)}°C`;
            currentHumidity.textContent = `Humidity: ${data1.main.humidity}%`;
            currentWindSpeed.textContent = `Wind Speed: ${data1.wind.speed} m/s`;
    
            next1Container.append(cityName);
            next1Container.append(currentDate);
            next1Container.append(currentIcon);
            next1Container.append(currentTemp);
            next1Container.append(currentHumidity);
            next1Container.append(currentWindSpeed);
    
          });
         
      });
    }
    fetchButton.addEventListener('click', getApi1);
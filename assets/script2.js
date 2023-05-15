var currentContainer = document.getElementById('current');
var next1Container = document.getElementById('next1');
var next2Container = document.getElementById('next2');
var fetchButton = document.getElementById('cityName');
var fetchButton1 = document.getElementById('cityName1');
var cityName = "";
var APIKey = "220446bbfe0cd21fc71d987d2f3b237f";


//For Current Weather
function getApi() {
  console.log("get API function running");
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey;

  const form = document.querySelector('form');
  const submitBtn = document.querySelector('#submitBtn');

  submitBtn.addEventListener('click', function (event) {
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
      .catch(function (error) {
        console.log(error);
        currentContainer.innerHTML = `<p>Sorry, we could not find the weather data for ${cityName}. Please try again.</p>`;
      });
  });
}
fetchButton.addEventListener('click', getApi);

//For Forecast Weather

function getApi1() {
  console.log("get API function running");
  var requestUrl1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey;
  const submitBtn = document.querySelector('#submitBtn');
  submitBtn.addEventListener('click', function (event) {
    event.preventDefault();

    cityName = document.querySelector('#cityName').value;
    requestUrl1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey;
    saveSearch(cityName);
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
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
        return fetch(forecastUrl);
      })

      .then(function (response) {
        return response.json();
      })
      .then(function (data1) {
        // console.log(data1);
        // Clear previous search results
        next1Container.innerHTML = "";
        // Create and append new elements for the search results

        for (i = 0; i < data1.list.length; i++) {
          var forecastObject = data1.list[i];
          if (forecastObject.dt_txt.includes("12:00:00")) {
            // console.log(forecastObject);
            var forecastCard = document.createElement("div");
            var cityName = document.createElement('h3');
            var currentDate = document.createElement('h3');
            var currentIcon = document.createElement('h3');
            var currentTemp = document.createElement('p');
            var currentHumidity = document.createElement('p');
            var currentWindSpeed = document.createElement('p');

            cityName.textContent = forecastObject.name;
            currentDate.textContent = new Date(forecastObject.dt * 1000).toLocaleDateString();
            currentIcon.innerHTML = `<img src="https://openweathermap.org/img/w/${forecastObject.weather[0].icon}.png">`;
            currentTemp.textContent = `Temperature: ${Math.round(forecastObject.main.temp - 273.15)}°C`;
            currentHumidity.textContent = `Humidity: ${forecastObject.main.humidity}%`;
            currentWindSpeed.textContent = `Wind Speed: ${forecastObject.wind.speed} m/s`;

            forecastCard.append(cityName);
            forecastCard.append(currentDate);
            forecastCard.append(currentIcon);
            forecastCard.append(currentTemp);
            forecastCard.append(currentHumidity);
            forecastCard.append(currentWindSpeed);
            next1Container.append(forecastCard);

          }
        }
      });
  });
}
fetchButton.addEventListener('click', getApi1);

// TODO: finish implementing saveSearch

function saveSearch(city) {
  console.log(city);
  // Store the search query in local storage
  localStorage.setItem('lastSearch', city);

  // Retrieve the search query from local storage
  var lastSearch = localStorage.getItem('lastSearch');
  console.log('Last search: ' + lastSearch);

  // Create button with the city as its text
  var button = document.createElement('button');
  button.textContent = lastSearch;
  button.setAttribute('data-city', lastSearch);

  // Add the button to the document
  document.body.appendChild(button);

  // TODO: Attach click event that calls API for the city
  // HINT: Use data- atrributes

  button.addEventListener('click', function () {
    var cityName = this.getAttribute('data-city');
    console.log('Fetching data for city: ' + cityName);
    // Make API call for the city using its name
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // TODO: Display the weather data on the page
        displayWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });

  // TODO: Append button to a div in your HTML
  var searchHistoryDiv = document.getElementById('search-history');
  searchHistoryDiv.appendChild(button);

  // TODO: Push city into an array and save to localStorage
  var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  searchHistory.push(city);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function loadSavedSearches() {
  // Enter code that grabs array of citites from localStorage and loads them onto page as buttons
  var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  var searchHistoryDiv = document.getElementById('search-history');

  for (var i = 0; i < searchHistory.length; i++) {
    var button = document.createElement('button');
    button.textContent = searchHistory[i];
    button.setAttribute('data-city', searchHistory[i]);
    button.addEventListener('click', function () {
      var cityName = this.getAttribute('data-city');
      console.log('Fetching data for city: ' + cityName);
      // Make API call for the city using its name
      fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // TODO: Display the weather data on the page
          displayWeatherData(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    });

    if (searchHistory.length >= 8) {
      // Remove oldest city if more than 8 saved
      searchHistory.shift();
    }

    searchHistoryDiv.appendChild(button);

  }
}
window.addEventListener('load', function () {
  loadSavedSearches();
});





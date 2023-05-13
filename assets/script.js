var issueContainer = document.getElementById('issues');
var fetchButton = document.getElementById('fetch-button');
var city = "Toronto";
var APIKey = "220446bbfe0cd21fc71d987d2f3b237f";

function getApi() 
  var requestUrl ='http://api.openweathermap.org/data/2.5/weather?q="Toronto,ON,CA"&appid="220446bbfe0cd21fc71d987d2f3b237f"';


  fetch(requestUrl, {
    cache: 'reload',
  })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        var cityName = document.createElement('h3');
        var currentDate = document.createElement('h3');
        var currentIcon = document.createElement('h3');
        var curreentTemp = document.createElement('p');
        var curreentHumidity = document.createElement('p');
        var curreentWindSpeed = document.createElement('p');

        cityName.textContent = data[i].user.login;
        currentDate.textContent = data[i].title;
        currentIcon.textContent = data[i].user.login;
        curreentTemp.textContent = data[i].title;
        curreentHumidity.textContent = data[i].user.login;
        curreentWindSpeed.textContent = data[i].title;

        issueContainer.append(cityName);
        issueContainer.append(currentDate);
        issueContainer.append(currentIcon);
        issueContainer.append(curreentTemp);
        issueContainer.append(curreentHumidity);
        issueContainer.append(curreentWindSpeed);

      }
    });

fetchButton.addEventListener('click', getApi);

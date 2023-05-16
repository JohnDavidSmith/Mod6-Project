# 06 Server-Side APIs: Weather Dashboard

## Your Task

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [5 Day Weather Forecast](https://openweathermap.org/forecast5) to retrieve weather data for cities. The base URL should look like the following: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

**Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Mock-Up

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Atlanta.](./Assets/06-server-side-apis-homework-demo.png)

## Description 

* This is a Weather Dashboard can display the current day and five days forecast for any city around the world by entering the city name only.

## Contents 

* This Weather Dashboard application has one button to enter the city name and eight buttons of saved previous searched city names you can use them to display the weather as well. 

## Installation 

* Doesn't need any instillation just enter the city name and press search button you will get the current day and five days forecast weather for that city.
  
## Usage 

* This application can be used by anyone wants to know the weather of any city around the world it will give the current day and five days weather forecast. You have to notice that if you are using the East Canada and USA time (EST) the first day of the five day forecast will be the same current day because of the time zone difference between EST and the weather company which provide the data. The next day will be visible in the five days forecast box after 8:00 pm EST.      

## Screenshot

![Screenshot of the Weather Dashboard Application](./assets/Screenshot-Weather-Dashboard.png)

## GitHub link to the Weather Dashboard Application.

[The Weather Dashboard Application](https://johndavidsmith.github.io/Mod6-Project/)

## Credits

* 
## License
* 

## Badges
* 

## Features
* 

## How to Contribute
* 

## Test
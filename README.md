# Weather Journal App - 2nd Project - Udacity - FWD - Professional Web Development - NanoDegree

- <strong>The project link on Github:</strong> https://github.com/mem000/weather-journal-app-fwd

* An asynchronous web app that uses Web API and user data to dynamically update the UI for a Weather-Journal App.
* This app gets the current temperature from [Open Weather Map](https://openweathermap.org/) API according to the user input for a city name.

## Table of Contents

- [Overview](#overview)
- [Project Scenario](#Project-Scenario)
- [Project Files](#Project-Files)

## Overview:

<strong>This projects involves dealing with Web API and build Asynchronous Application through the following steps:</strong>

- Setup a Node environment with Express and the necessary project dependencies.
- Setup a server with GET and POST routes.
- Create developer credentials for a Web API.
- Use the Fetch API with my credentials and user input to get dynamic data into my app routes.
- Access a GET route on the server side, from a function called on the client side.
- Chain Promises together.
- Access HTML elements with JavaScript and set their properties dynamically.

## Project-Scenario:

- When user opens the app, it should enter a valid city name, and then the user can press 'Generate', there a drop-down list of some cities from which the user can choose or enter any other city.
- First the app checks that city name is not empty, if it's empty the app will display error messgae 'City name cannot be empty, please enter it', otherwise the app then sends a GET to [OpenWeatherMap](https://openweathermap.org/) API to obtain the current weather data of the specified city, and then the API responds:
  <ul>
      <li> 
      Case (1): if the city name is not valid, the API will respond with ERROR message ('404 - Not Found'), and then an error messgae 'Please enter a valid city name' will be displayed on UI.
      </li>
      <li>
      Case (2): if the city name is valid, the API will respond with an object holds the current weather data of the specified city, after that app will extract the temperature from this object, and build a new object contains (city name, temperature, current time & date, and user feelings) and sends this new object in a POST request to the local server.
      </li>
  </ul>
- for every POST request to the local server, the server will add a new entry in the projectData array (this array includes all objects data receied from the client).
- updateUI function:
  finally this function will send a GET request to the local request on the route path '/allProjectData', and the server will respond by allPojectData array, and then the function will access the last object added to this array, and obtain the object data, and send these data as a new entry in UI.

## Project-Files:

- <strong> server.js</strong>: The server-side code.
- <strong> app.js</strong>: The client-side code.
- <strong> index.html</strong>: the app interface.
- <strong> style.css</strong>: the base style file of our app.
- <strong> animatedBackground.css</strong>: css file for the animated background.
- <strong> animatedBackground.js</strong>: js file for the animated background.

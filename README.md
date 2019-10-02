# WeatherApp - NodeJS

A simple weather app that uses the openweathermap.org API 
Returns the current weather temperature, written with Node.JS
Made from: https://codeburst.io/build-a-weather-website-in-30-minutes-with-node-js-express-openweather-a317f904897b

### Adding your API key

You'll need to create and account and get your own API key from:
https://home.openweathermap.org
All you need is to register, when you're logged in look for the 'API Keys'
menu, and you can generate as many as you need.

### Running the server

Before you can get anything running you'll need to make sure you run:
```
npm install --save express
npm install ejs --save
npm install body-parser --save
```
Those are all essential packages needed to run this server, when testing this will all function
off of localhost, port 3000. 

Lastly, a quick word on ejs, the index.ejs uses this. I used VS Code to work with this and it 
requires a separate plugin to understand the ejs tags. 

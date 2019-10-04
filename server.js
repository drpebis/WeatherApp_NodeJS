const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const apiKey = 'INSERT YOUR API KEY HERE';
const weather = {
    weather: null,
    error: null
};

let timestamp;

const requestWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        request(url, (err, response, body) => {
            const weatherResponse = JSON.parse(body);

            if (err) {
                //Error message in the case of an issue with the entered string
                let errMsg = JSON.stringify(err);
                weather.error = 'Error, please try again.';
                console.log(`${timestamp} - ${city} - error: ${errMsg}`);
                resolve();
            } else if (!weatherResponse.name || !weatherResponse.main.temp) {
                //Error covering an issue exerienced through the API
                weather.error = 'Error, please try again.';
                console.log(`${timestamp} - ${city} - unexpected api output: ${body}`);
                resolve();
            } else {
                //weather.weather is directly used by Index.ejs. What you see below is by default in
                //celcius, so the formula there is to convert it to F. You'll need to edit this in order
                //to change what is shown in the Index.ejs file
                weather.weather = `Its ${(weatherResponse.main.temp) * 1.8 + 32} °F in ${city}.`;
                weather.error = null;
                console.log(`${timestamp} - ${city} - ${body}`);
                resolve();
            }
        });
    });
};

const clearWeather = () => {
    weather.weather = null;
    weather.error = null;
};

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', weather);
});

app.post('/', (req, res) => {
    const city = req.body.city;
    timestamp = Date.now();
    console.log(`${timestamp} - ${city} - weather requested`);
    requestWeather(city).then(() => {
        res.render('index', weather);
        clearWeather();
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000!');
});
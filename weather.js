const express = require("express");
const https = require("https");
const { response } = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const city = req.body.cityName;
    const apiKey = "7dc552633ace25951abbed9dfdf623ce";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+ apiKey + "&units=" + unit;
    
    https.get(url, function(response) {
        console.log(response.statusCode + " " + response.statusMessage);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

            res.write("<h1></h1>The temperature in " + city + " is " + temp + " degress Celsius.</h1>");
            res.write("<p>Current weather: " + description + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });    
});

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});